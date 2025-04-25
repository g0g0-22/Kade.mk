import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import  MapView, { LatLng, PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps';
import { places } from '../../constants/Places'
import { mapStyle } from '@/constants/MapStyle';
import { useLocalSearchParams } from 'expo-router';
const map = () => {
  const { latitude, longitude } = useLocalSearchParams();
  const centerLat = parseFloat(latitude as string)
  const centerLng = parseFloat(longitude as string)
  const region = centerLat && centerLng ? {
    latitude: centerLat,
    longitude: centerLng,
    longitudeDelta: 0.005,
    latitudeDelta: 0.005,
  } : {
    latitude: 41.9970711182099,
    longitude: 21.426565355119443,
    longitudeDelta: 0.05,
    latitudeDelta: 0.05
  }
  return (
    <SafeAreaView>
        <MapView style={styles.map}
        showsUserLocation={true}
        initialRegion={
          region
        }
        >
          {places.map((place)=>(
            <Marker 
            key={place.name}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.name}
            />
          ))}
          
          </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
   }
});

export default map;