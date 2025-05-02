import React from 'react';
import { useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Platform, UIManager, LayoutAnimation, Alert } from 'react-native'; 
import { useFonts } from 'expo-font'
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import Tag from './Tag';
import { TAGS } from '../constants/Tags'
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

type CardProps = {
  name: string,
  address: string,
  photos: string[],
  hours: string[],
  phone?: string,
  instagram: string,
  tags: string[],
  latitude: number,
  longitude: number,
  cardTagPressHandler: (tagId: string, context:string)=>void;
};


export default function Card({ name, address, photos, hours, phone, instagram, tags, cardTagPressHandler, latitude, longitude}: CardProps) {
  const today = new Date().getDay();
  const getTodayIndex = () => today === 0 ? 2 : today === 6 ? 1 : 0;
  const [FontsLoaded] = useFonts({
    'Roboto': require('../assets/fonts/Roboto-VariableFont_wdth,wght.ttf')
  })
  const [extended, setExtended] = useState(false);
  const visibleTags = extended ? tags : tags.slice(0,3);
  const hiddenCount = tags.length - visibleTags.length;
  const tagPressHandler = (id: string, context: string) => {
      cardTagPressHandler(id,context);
  }
  if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <View style={styles.shadowWrapper}>
    <View style={[styles.card, extended && styles.cardExtended]}>
      <View style={styles.imageContainer}>
      <FlatList
        horizontal
        data={photos}
        showsHorizontalScrollIndicator = {false}
        renderItem={({ item }) => (
          <Image 
            source={{uri: item}}  
            style={styles.image}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      </View>
      <View style={styles.bottomWrap}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Feather name='clock' size={16} color='#06202B'/>
            <Text style={{color:'#06202B'}}> {hours[getTodayIndex()]}</Text>
          </View>
          <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Text style={{color:'#077A7D'}} >About 10 minutes away </Text>
            <Ionicons name='footsteps' size={16} color='#077A7D'/>
          </View>
          {extended ? <View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
          <Text style={{color:"gray", marginBottom: 0,}}>{address} </Text>
          <Feather name='map-pin' size={16} color="gray"/>
          </View>
          <View style={
            {flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 12,
              paddingVertical: 4,
              gap: 12
            }
          }>
            {phone &&
            <TouchableOpacity onPress={()=> Linking.openURL(`tel:${phone}`)}>       
              <Feather name='phone' size={24} color='#72BAA9'/>
            </TouchableOpacity>
            }
            <TouchableOpacity onPress={()=>Linking.openURL(`${instagram}`)}>
              <Feather name='instagram' size={24} color='#7E5CAD'/>
            </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                if(latitude && longitude){
                router.push({
                pathname:'/map',
                params: {
                  latitude: latitude.toString(),
                  longitude: longitude.toString(),
                }
                
                })}}}>
                <Feather name='map-pin'size={24} color='#474E93'/>
              </TouchableOpacity>
          </View>
          </View> : <></>}
        </View>


        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
            <View style={{flex:1,flexDirection: 'row', flexWrap:'wrap', gap: 6, paddingLeft: 6, paddingBottom: 6 }}>
            {visibleTags.map(tagId => <Tag key={tagId} id={tagId} context="card" onPress={tagPressHandler}/>)}
            {!extended && hiddenCount>0 && (
              <TouchableOpacity onPress={()=>{setExtended(true)
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              }}>
                <View><Text style={{color: '#525252', paddingTop:2}}>+{hiddenCount} more</Text></View>
              </TouchableOpacity>
            )}
            </View>
            
          <View><TouchableOpacity 
              activeOpacity={1}
              style={styles.button}
              onPress={()=>{
                setExtended(!extended);
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                }}>
                <Feather name='chevron-down' color='#525252' style={{
                  transform: [{rotate: extended ? '180deg' : '0deg'}]
                }}/>
            </TouchableOpacity></View>
          </View>
      </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  shadowWrapper: {
    marginHorizontal: 16,
    marginVertical: 10,
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,

    elevation: 6,
  },
  card: {
    paddingHorizontal: 4,
    paddingTop: 4,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardExtended: {
  },
  imageContainer: {
    overflow:'hidden',
    paddingHorizontal: 3,
    paddingTop: 3,
  },
  image: {
    width: 260,
    height: 160,
    margin: 3,
    borderRadius: 6,
  }, 
  bottomWrap: {

  },
  textContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingTop: 6,
    paddingBottom: 12,
    gap: 5,
  },
  title: {
    fontWeight: 600,
    fontSize: 24,
    fontFamily: 'Roboto'
  },
  
  button: {
    marginRight: 12,
    marginBottom: 12,
  }
})