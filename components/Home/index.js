import React, { PureComponent } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import styles for component
import styles from './styles';

class Home extends PureComponent {
    constructor(props) {
        super(props);
      }
        

    render() {
        
        return (
            <View style={styles.homeDiv}>
                <Image source={{uri: 'https://i.hizliresim.com/nVI0AD.png'}}
                    style={styles.homePageImage} />
                <Text style={styles.header}>realMove</Text>
                <Text style={styles.header}>Buraya login gelcek</Text>
                <Button
                
                color="#000"
                title="Go to Advert List"
                onPress={() => this.props.navigation.navigate('AdvertList')}
            />
            </View>
        )
    }
}



//Export the statelesss component as a default export 
export default Home;