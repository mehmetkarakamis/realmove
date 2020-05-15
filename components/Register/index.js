import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Provider, Toast, InputItem } from '@ant-design/react-native';
//import styles for component
import styles from './styles';

class Register extends PureComponent {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <Provider>
                <View style={styles.homeDiv}>
                    <Text style={styles.header}>realMove</Text>
                    <InputItem
                        clear
                        placeholder="omercan.celikler@gmail.com"
                    >E-mail
                    </InputItem>
                    <InputItem
                        type="password"
                    >Şifre
                    </InputItem>
                    <Button
                        onPress={() => this.props.navigation.navigate('AdvertList')}
                    >Kayıt Ol</Button>

                </View>
            </Provider>
        )
    }
}



//Export the statelesss component as a default export 
export default Register;