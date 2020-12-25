import React, { useState, useEffect } from "react";
import BottomBar from "../bottom-bar";
import axios from "../../utils/Axios.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from 'react-native-get-location';



import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Button
} from 'react-native';


import MapView, { Marker } from 'react-native-maps';
// import Adverts from "../../adverts.json";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width;
const LATITUDE = 39.874252;
const LONGITUDE = 32.747575;
const LATITUDE_DELTA = 0.51;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const coordDolmabahce = {
  latitude: 41.0391683,
  longitude: 28.9982707,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};



class Map extends React.PureComponent {
	constructor() {
		super();
		this.state = {
      loading: true,
      region: {
        latitude: 100,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      currentRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
  }
}

_requestLocation = () => {
  this.setState({ loading: true, location: null });

  GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
  })
      .then(location => {
          this.setState({
              currentRegion: location,
              loading: false,
          });
        
      })
      .catch(ex => {
          const { code, message } = ex;
          console.warn(code, message);
          if (code === 'CANCELLED') {
              Alert.alert('Location cancelled by user or by another request');
          }
          if (code === 'UNAVAILABLE') {
              Alert.alert('Location service is disabled or unavailable');
          }
          if (code === 'TIMEOUT') {
              Alert.alert('Location request timed out');
          }
          if (code === 'UNAUTHORIZED') {
              Alert.alert('Authorization denied');
          }
          this.setState({
              location: null,
              loading: false,
          });
      });
}



componentDidMount() {
  this.requestAdverts();


  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
.then(location => {
    this.setState({latitude: location.latitude, longitude: location.longitude});

})
.catch(error => {
    const { code, message } = error;
    console.warn(code, message);
})

}


requestAdverts = () => {
  this.setState({ loading: true }, async() => {
    axios.get("/adverts-ws/api/advert/all", {
      headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
    })
    .then((response) => {
      this.setState({ adverts: response.data });
      
    })
    .catch(() => {
      Toast.error("Sunucuya bağlanırken hata ile karşılaşıldı!");
    })
    .finally(() => { this.setState({ loading: false }); });
  });
}
  



  render() {
    return (
      
      <View style={{ flex: 1 }}>

        <MapView
          ref={(mapView) => { _mapView = mapView; }}
          initialRegion={this.state.region}
          style={styles.map}
        >
          {this.state.currentRegion !== undefined && <Marker coordinate={this.state.currentRegion} />}
          {this.state.adverts && this.state.adverts.map(marker => (
            <Marker
              key={marker.id}
              image={require('./home.png')}
              width={1}
              height={1}
              
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
            />
          ))}
          {(this.state.latitude && this.state.longitude) &&
            <Marker coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            >
            </Marker>
            
          }
        </MapView>
        <Button
                        disabled={this.loading}
                        title="Yakındakileri Göster"
                        onPress={() => _mapView.animateToRegion({
                          latitude: this.state.latitude,
                          longitude: this.state.longitude,
                          latitudeDelta: 0.02,
                          longitudeDelta: 0.02
                        }, 1000)}
                    />
        <FlatList
          data={this.state.adverts}
          renderItem={({ item }) => <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => _mapView.animateToRegion({
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }, 1000)}>
            <View style={styles.listItemContainer}>
              <Text style={styles.pokeItemHeader}>{item.description}</Text>
              <Image source={{ uri: item.advertPictures[0] }}
                style={styles.pokeImage} />
            </View>
          </TouchableOpacity>}
          keyExtractor={(item) => item.advertId}
        />
        <BottomBar index={1} navigation={this.props.navigation} />
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: 500
  },
  listItemContainer: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  pokeItemHeader: {
    color: 'grey',
    fontSize: 15,
    width: 200
  },
  pokeImage: {
    backgroundColor: 'transparent',
    height: 40,
    width: 40
  }
})

export default Map; 