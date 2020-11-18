import React, { useState, useEffect } from "react";
import BottomBar from "../bottom-bar";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Adverts from "../../adverts.json";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width;
const LATITUDE = 39.874252;
const LONGITUDE = 32.747575;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = (props) => {

  let region = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={(mapView) => { _mapView = mapView; }}
        initialRegion={region}
        style={styles.map}
      >
        {Adverts.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.coordinates.latitude,
              longitude: marker.coordinates.longitude
            }}
          />
        ))}
      </MapView>
      <FlatList
        data={Adverts}
        renderItem={({ item }) => <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={() => _mapView.animateToRegion({
          latitude: item.coordinates.latitude,
          longitude: item.coordinates.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        }, 1000)}>
          <View style={styles.listItemContainer}>
            <Text style={styles.pokeItemHeader}>{item.name}</Text>
            <Image source={{ uri: item.thumbnail }}
              style={styles.pokeImage} />
          </View>
        </TouchableOpacity>}
        keyExtractor={(item) => item.id}
      />
      <BottomBar index={1} navigation={props.navigation} />
    </View>
  )
};


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
});

export default Map;