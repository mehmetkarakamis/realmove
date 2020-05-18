import React from 'react';
//import comopnents
import AdvertCard from '../AdvertCard';
//import your components from react-native
import { ImageBackground, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { Button, Carousel, InputItem, Toast } from '@ant-design/react-native';
import Drawer from 'react-native-drawer'
//import styles for your component
import styles from './styles';

import Adverts from "../../adverts.json";

export default class AdvertList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            render_thumbnails: null
        }
    }
    //Define your state for your component. 
    state = {
        //Assing a array to your pokeList state
        advertList: [],
        loading: true
    }
    //Define your navigation options in a form of a method so you have access to navigation props.
    static navigationOptions = {
        title: 'List of Adverts'
    }

    closeControlPanel = () => {
        this._drawer.close();
    };

    openControlPanel = () => {
        this._drawer.open();
    };

    renderThumbnails = () => {
        let render = [];
        for (let i = 0; i < 3; i++) {
            render.push(
                <ImageBackground
                    source={{ uri: Adverts[i].thumbnail }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200, width: "100%" }}
                    key={i}
                >
                    <Text style={{ fontWeight: "bold", fontSize: 13, padding: 10, borderRadius: 15, backgroundColor: "rgba(255,255,255,0.6)", width: "50%" }}>{Adverts[i].name}</Text>
                </ImageBackground>
            );
        }
        this.setState({ render_thumbnails: render });

    }

    componentDidMount() {
        this.renderThumbnails();
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
                <Drawer content={
                    <View>
                        <Button onPress={() => this.closeControlPanel()} type="primary">Kapat</Button>
                        <InputItem
                            clear
                            placeholder="Açıklama"
                        />

                        <InputItem
                            clear
                            placeholder="Lokasyon"
                        />

                        <InputItem
                            clear
                            placeholder="Fiyat"
                        />

                        <Button onPress={() => this.closeControlPanel()} style={{ color: "#FFF", backgroundColor: "rgb(180,150,200)" }}>Kaydet</Button>
                    </View>
                } ref={(ref) => this._drawer = ref}>
                    <View>
                        <Carousel
                            style={styles.wrapper}
                            selectedIndex={2}
                            autoplay
                            infinite
                            afterChange={this.onHorizontalSelectedIndexChange}
                        >
                            {this.state.render_thumbnails}
                        </Carousel>
                        <View style={{ margin: 10, display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <Text style={styles.title}>Tüm İlanlar</Text>
                            <Button onPress={() => this.props.navigation.navigate("Map")} style={{ marginRight: 10 }} navigation={navigation}>Harita</Button>
                            <Button type="primary" onPress={() => this.openControlPanel()}>Yeni Ekle</Button>
                        </View>

                        <FlatList
                            data={Adverts}
                            renderItem={(data) => <AdvertCard {...data.item} navigation={navigation} />}
                            keyExtractor={(item) => item.id}
                        /></View>
                </Drawer>
            );
        } else {
            return <ActivityIndicator />
        }
    }
}