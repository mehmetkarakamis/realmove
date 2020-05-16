//import PoreCompoent for preventing unnecesary updates. 
import React, { PureComponent } from 'react';
//import comopnents
import AdvertCard from '../AdvertCard';
//import your components from react-native 
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import { Button, Provider, Toast, InputItem, Carousel } from '@ant-design/react-native';
//import styles for your component
import styles from './styles';

export default class AdvertList extends PureComponent {
    //Define your state for your component. 
    state = {
        //Assing a array to your pokeList state
        advertList: [],
        //Have a loading state where when data retrieve returns data. 
        loading: true
    }
    //Define your navigation options in a form of a method so you have access to navigation props.
    static navigationOptions = {
        title: 'List of Adverts'
    }
    //Define your componentDidMount lifecycle hook that will retrieve data.
    //Also have the async keyword to indicate that it is asynchronous. 
    async componentDidMount() {
        //Have a try and catch block for catching errors.
        try {
            //Assign the promise unresolved first then get the data using the json method. 
            const pokemonApiCall = await fetch('https://pokeapi.co/api/v2/pokemon/');
            const pokemon = await pokemonApiCall.json();
            this.setState({ advertList: pokemon.results, loading: false });
        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
    }
    render() {

        const { advertList, loading } = this.state;
        //Destruct navigation from props 
        const { navigation } = this.props;
        //If laoding to false, return a FlatList which will have data, rednerItem, and keyExtractor props used.
        //Data contains the data being  mapped over.
        //RenderItem a callback return UI for each item.
        //keyExtractor used for giving a unique identifier for each item.
        if (!loading) {
            return (
                <View>
                    <Carousel
                        style={styles.wrapper}
                        selectedIndex={2}
                        autoplay
                        infinite
                        afterChange={this.onHorizontalSelectedIndexChange}
                    >
                        <View
                            style={[styles.containerHorizontal, { backgroundColor: 'red' }]}
                        >
                            <Text>Carousel 1</Text>
                        </View>
                        <View
                            style={[styles.containerHorizontal, { backgroundColor: 'blue' }]}
                        >
                            <Text>Carousel 2</Text>
                        </View>
                        <View
                            style={[
                                styles.containerHorizontal,
                                { backgroundColor: 'yellow' },
                            ]}
                        >
                            <Text>Carousel 3</Text>
                        </View>
                        <View
                            style={[styles.containerHorizontal, { backgroundColor: 'aqua' }]}
                        >
                            <Text>Carousel 4</Text>
                        </View>
                        <View
                            style={[
                                styles.containerHorizontal,
                                { backgroundColor: 'fuchsia' },
                            ]}
                        >
                            <Text>Carousel 5</Text>
                        </View>
                    </Carousel>
                    <Text style={styles.title}>All Adverts</Text>
                    <FlatList
                        data={advertList}
                        renderItem={(data) => <AdvertCard {...data.item} navigation={navigation} />}
                        keyExtractor={(item) => item.name}
                    /></View>)
        } else {
            return <ActivityIndicator />
        }
    }
}