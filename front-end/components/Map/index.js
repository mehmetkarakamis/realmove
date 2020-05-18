
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Adverts from "../../adverts.json";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 39.874252;
const LONGITUDE = 32.747575;
const LATITUDE_DELTA = 0.0722;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {

  let region = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  }

  console.log(Adverts[0]);


  return (
    <View style={{ flex: 1 }}>
      <MapView
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
    ...StyleSheet.absoluteFillObject
  },
});

export default Map;