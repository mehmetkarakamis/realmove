//import React form react
import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

import styles from './styles';


//Define your stateless componetns, and destrcuts props from function arguments

const AdvertCard = ({name, url, id, navigation, thumbnail}) => {
    return (
        <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={() => navigation.navigate('Advert', {id})}>
            <View  style={styles.listItemContainer}>
                <Text style={styles.pokeItemHeader}>{name}</Text>
                <Image source={{uri: thumbnail}} 
                        style={styles.pokeImage}/>
            </View>
        </TouchableOpacity>
    )
}


export default AdvertCard;