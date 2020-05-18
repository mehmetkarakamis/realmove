//import StyleSheet from react-native to provide styling via a css abstraction
import { StyleSheet } from 'react-native';

//Define your styles 
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        height: '100%'
    },
    advertImage: {
        height: 250,
        width: '100%'
    },
    nameOfPokemon: {
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    }
})

//Export your styles
export default styles;