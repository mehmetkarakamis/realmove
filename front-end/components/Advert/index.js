import React, { PureComponent} from 'react';
//import UI from react-native
import { View, Text, Image, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { List } from '@ant-design/react-native';
//import styles for component.
import styles from './styles';

import Adverts from "../../adverts.json";

class Advert extends PureComponent {
    constructor(props) {
        super(props);
        this.id = this.props.route.params.id;
        // Don't call this.setState() here!
        this.state = {
            advert: null,
            loading: true
        };
      }

    

    async componentDidMount(){
        //Assign the promise unresolved first then get the data using the json method. 
        var filteredAdvert = Adverts.filter( p => p.id === this.id );
        setTimeout(() => {
            this.setState({advert: filteredAdvert[0], loading: false});       
        }, 1000);
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
        const Item = List.Item;
        
        
        if(!loading) {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={{uri: `${advert.thumbnail}`}}
                            style={styles.advertImage} />

                    <List renderHeader={() => 'İlan Bilgileri'} className="my-list">
                        <Item extra={`${advert.name}`}>İlan</Item>
                        <Item extra={`${advert.price}`}>Fiyat</Item>
                        <Item extra={`${advert.location}`}>Konum</Item>
                        <Item extra={`${advert.advertType}`}>İlan Türü</Item>
                        <Item extra={`${advert.squareMeter}`}>M2</Item>

                    </List>
                    <List renderHeader={() => 'Ek Bilgiler'} className="my-list">
                        <Item extra={`${advert.residentalType}`}>Tapu Cinsi</Item>
                        <Item extra={`${advert.numberOfRooms}`}>Oda Sayısı</Item>
                        <Item extra={`${advert.floorNumber}`}>Bulunduğu Kat</Item>
                        <Item extra={`${advert.numOfBuildingFloors}`}>Kat Sayısı</Item>
                        <Item extra={`${advert.buildingAge}`}>Bina Yaşı</Item>
                        <Item extra={`${advert.furnitureStatus}`}>Eşya Durumu</Item>
                        <Item extra={`${advert.numOfBathrooms}`}>Banyo Sayısı</Item>
                    </List>
                    <List renderHeader={() => 'İlan Sahibi'} className="my-list">
                        <Item extra={`${advert.user.name}`}>Ad</Item>
                        <Item extra={`${advert.user.phone}`}>Telefon Numarası</Item>
                    </List>

                </View>
            </ScrollView>
        )} else {
            return <ActivityIndicator />
        }
    }
}

export default Advert;