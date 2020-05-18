//import styleSheet for creating a css abstraction.
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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

export default styles;