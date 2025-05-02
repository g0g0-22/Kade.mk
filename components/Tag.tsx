import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { TAGS } from '../constants/Tags'
type TagProps = {
    id: string,
    name?: string,
    onPress?: (id:string, context:string)=>void
    context: string,
}
const getTagStyle = (id: string) => {
    switch(id){
        case "coffee":
            return { borderColor: "#582f0e", textColor: "#582f0e", backgroundColor: "#b6ad90"}
            case 'beer':
                return { borderColor: '#92400e', textColor: '#92400e', backgroundColor: '#fde68a' }; // amber beer tones
              case 'billiards':
                return { borderColor: '#065f46', textColor: '#065f46', backgroundColor: '#a7f3d0' }; // pool table green
              case 'food':
                return { borderColor: '#7c2d12', textColor: '#7c2d12', backgroundColor: '#fde4cf' }; // rich earthy tones
              case 'fastfood':
                return { borderColor: '#991b1b', textColor: '#991b1b', backgroundColor: '#fecaca' }; // fast, loud, red
              case 'traditional':
                return { borderColor: '#78350f', textColor: '#78350f', backgroundColor: '#fef3c7' }; // rustic brown/gold
              case 'brunch':
                return { borderColor: '#9d174d', textColor: '#9d174d', backgroundColor: '#fbcfe8' }; // soft brunch pink
              case 'cocktails':
                return { borderColor: '#5b21b6', textColor: '#5b21b6', backgroundColor: '#ddd6fe' }; // fun purples
              case 'karaoke':
                return { borderColor: '#3b0764', textColor: '#3b0764', backgroundColor: '#e9d5ff' }; // neon-y vibe
              case 'live-music':
                return { borderColor: '#1e3a8a', textColor: '#1e3a8a', backgroundColor: '#bfdbfe' }; // stage blue
              case 'dancing':
                return { borderColor: '#be123c', textColor: '#be123c', backgroundColor: '#fecdd3' }; // party reds
              case 'chill':
                return { borderColor: '#047857', textColor: '#047857', backgroundColor: '#d1fae5' }; // mint green calm
              case 'romantic':
                return { borderColor: '#9d174d', textColor: '#9d174d', backgroundColor: '#ffe4e6' }; // deep pink
              case 'nightlife':
                return { borderColor: '#1e40af', textColor: '#1e40af', backgroundColor: '#c7d2fe' }; // cool blue night
              case 'luxury':
                return { borderColor: '#78350f', textColor: '#78350f', backgroundColor: '#fef9c3' }; // gold tones
              case 'underground':
                return { borderColor: '#111827', textColor: '#111827', backgroundColor: '#e5e7eb' }; // grungy gray
              case 'coffee':
                return { borderColor: '#582f0e', textColor: '#582f0e', backgroundColor: '#b6ad90' }; // already defined
              default:
                return { borderColor: '#6b7280', textColor: '#6b7280', backgroundColor: '#e5e7eb' }; // fallback gray
            }
            
}

export default function Tag({id,name, onPress, context} : TagProps){
    const dynamicStyle = getTagStyle(id);
    const borderColor = dynamicStyle?.borderColor;
    const textColor = dynamicStyle?.textColor;
    const backgroundColor = dynamicStyle?.backgroundColor;
    const displayName = name ?? TAGS.find(tag => tag.id === id)?.name ?? id;

    function pressHandler(){
        onPress?.(id, context)
    }

    return(
    <TouchableOpacity 
    onPress={pressHandler}
    activeOpacity={0.7}
    style={[styles.tag, {borderColor: borderColor, backgroundColor: backgroundColor}]}>
    
        <Text style={[styles.tagText, {color: textColor}]}>{displayName}</Text>
        {context === 'in-filter' ?
        <Feather name='x-circle' size={16} color={borderColor} style={{marginLeft: 3}}/> : <></>
    }
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tag: {
        borderWidth: 2,
        color: 'red',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        borderRadius: 10,
        //marginTop: 8,
        marginRight: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
      tagText: {
        fontWeight: 500
      },
})
