import React, { PureComponent} from 'react';
//import UI from react-native
import { View, Text, Image, ActivityIndicator } from 'react-native';
//import styles for component.
import styles from './styles';

class Advert extends PureComponent {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {loading: true };
      }

    

    async componentDidMount(){
        try {
            //Assign the promise unresolved first then get the data using the json method. 
            const pokemonApiCall = await fetch(this.props.route.params.url);
            const advert = await pokemonApiCall.json();    
            this.setState({advert: advert.base_experience, loading: false});            
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    //Define your navigationOptions as a functino to have access to navigation properties, since it is static.
    static navigationOptions = ({navigation}) => ({
        //Use getParam function to get a value, also set a default value if it undefined.
        title: `${this.props.route.params.name} Info`
    })
    //Define your class component
    render() {
        const { advert, loading } = this.state;
        const { navigation } = this.props;
        
        
        if(!loading) {
        return (
            <View style={styles.container}>
                <Image source={{uri: 'https://res.cloudinary.com/aa1997/image/upload/v1535930682/pokeball-image.jpg'}}
                        style={styles.pokemonImage} />
                <Text style={styles.nameOfPokemon}>{advert}</Text>
            </View>
        )} else {
            return <ActivityIndicator />
        }
    }
}

export default Advert;