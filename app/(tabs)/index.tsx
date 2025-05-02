import React, { useEffect } from 'react';
import { Image, View, Text, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native';
import Card from '../../components/Card';
import {useState} from 'react'
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TAGS } from '@/constants/Tags';
import { tags } from 'react-native-svg/lib/typescript/xmlTags';
import Tag from '../../components/Tag'
//import { places } from '../../constants/Places'
import { fetchPlaces } from '@/hooks/usePlaces';
import { GeoPoint } from 'firebase/firestore';

type Place = {
  name: string,
  address:string,
  tags: string[],
  photos: string[],
  location: GeoPoint,
  hours: string[],
  phone?: string,
  instagram: string,
}

const index = () => {
  const [_places, _setPlaces] = useState<Place[]>([]);
  useEffect(()=>{
    const loadPlaces = async () => {
      const data = await fetchPlaces();
      console.log("🔥 PLACES FETCHED:", data);
      _setPlaces(data);
    }
    loadPlaces();
  }, [])
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [tempFilters, setTempFilters] = useState<string[]>([]);
  const [filtered, setFiltered] = useState<Place[]>(_places);
  
  useEffect(()=>{
    if(selectedFilters.length === 0)
      setFiltered(_places);
    else{
      const results = _places.filter(place => place.tags.some(tag=>selectedFilters.includes(tag)));
      setFiltered(results);
    }
  },[selectedFilters, _places])

  const tagPressHandler = (id: string, context: string) => {
    if(context==='filter' && !tempFilters.includes(id)){
      setTempFilters(prev=>[...prev,id])      
    }
    else if(context === 'in-filter'){
      setTempFilters(tempFilters.filter(x => x!==id))
    }
    else if(context === 'card'){
              Alert.alert(
                "Filter by this tag?",
                `Do you want to see all locations tagged ${id}?`,
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      setSelectedFilters([id])
                      setTempFilters([id])
                    },
                    style: 'default'
                  },
                ],
                { cancelable: true } // optional, but good for Android
              );
            }
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:0, flexDirection:'row', justifyContent:'space-between', alignItems:'center', width: '90%'}}>
          <Image 
          source={require('@/assets/logo.png')}
          style={{width: 140, height: 50}}
          />
          <TouchableOpacity onPress={()=>{setModalVisible(true)}}
            ><Feather name='filter'
            color="#077A7D"
            size={32}
            /></TouchableOpacity>
      </View>
      <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      >
        <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
          <View style={{
            
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            paddingVertical: 12,
          }}>
            <Text style={{ fontSize: 24, fontWeight: '800' }}>Filters</Text>
            <TouchableOpacity onPress={() => {
              setModalVisible(false)}}>
              <Feather name='x-circle' size={32} color='#525252' />
            </TouchableOpacity>
          </View>
          <View>
          <View style={styles.TagContainer}>
            {TAGS.map((tag) => (
              <Tag onPress={tagPressHandler} key={tag.id} id={tag.id} context='filter' />
            ))}
          </View>
          <View style={styles.selectedTagContainer}>
            <Text style={{fontWeight: 600, color: 'gray'}}>Filtering by: </Text>
            {tempFilters.map((s)=>(<Tag onPress={tagPressHandler} key={s} id={s} context='in-filter' />))}
          </View>
          </View>
          <View style={styles.modalButtonContainer}>
          <TouchableOpacity activeOpacity={0.7} style={styles.applyFilters} onPress={()=>{
            setSelectedFilters(tempFilters)
            setModalVisible(false)
          }}>
            <Text style={{color: 'white', fontWeight: 700}}>Apply filters</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} style={styles.clearFilters}
          onPress={()=>{
            setTempFilters([]);
            setSelectedFilters([]);
            setModalVisible(false);
            }}
          >
            <Text style={{fontWeight: 700, color: "#383535"}}>Clear</Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
        </SafeAreaProvider>
    </Modal>
        <FlatList
        data={filtered}
        keyExtractor={(item)=> item.name}
        renderItem={({ item })=>(
            <Card
            name={item.name}
            address={item.address}
            photos={item.photos}
            phone={item.phone}
            tags={item.tags}
            hours={item.hours}
            instagram={item.instagram}
            cardTagPressHandler={tagPressHandler}
            latitude={item.location.latitude}
            longitude={item.location.longitude}
            />
            )}
        ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scroll: {
    width:'100%'
  },
  TagContainer:{
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,

    flex: 0, 
    marginHorizontal: 24, 
    flexWrap: 'wrap', 
    gap:4 ,
    flexDirection:'row', 
    backgroundColor:'white', 
    paddingHorizontal: 4, 
    paddingVertical: 4, 
    borderRadius: 10
  },
  selectedTagContainer:{
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 24,
    backgroundColor: 'white',
    marginTop: 16,
    minHeight: 30,
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 4,
    columnGap: 4,
  },
  modalButtonContainer: {
    flex:1, 
    flexDirection:'row',
    marginHorizontal: 24,
    justifyContent: 'space-between',
    gap: 5
  },
  applyFilters: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#077A7D',
    marginTop: 16,
    height: 40,
    width: '49%',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearFilters: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#cccccc',
    marginTop: 16,
    height: 40,
    width: '49%',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default index;