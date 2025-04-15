import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig'; // make sure the path is correct

const Index = () => {
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const querySnapshot = await getDocs(collection(db, 'test')); // match this to your Firestore collection
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setPlaces(data);
    };

    fetchPlaces();
  }, []);

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Firebase Test:</Text>
      {places.map((place) => (
        <View key={place.id} style={{ marginTop: 10 }}>
          <Text>Name: {place.name}</Text>
          <Text>Rating: {place.rating}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default Index;
