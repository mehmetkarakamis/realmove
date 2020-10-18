import React from 'react';
//import comopnents
import AdvertCard from '../AdvertCard';
//import your components from react-native
import { AsyncStorage, ImageBackground, FlatList, ActivityIndicator, View, ScrollView, Text } from 'react-native';
import { Button, Carousel, InputItem, Toast, Modal, Provider } from '@ant-design/react-native';
import Drawer from 'react-native-drawer'
//import styles for your component
import axios from "../../plugins/Axios.js";
import styles from './styles';

import Adverts from "../../adverts.json";

export default class AdvertList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            render_thumbnails: null,
            title: null,
            city: null,
            district: null,
            region: null,
            seprice: null,
            description: null,
            advertType: null,
            squareMeter: null,
            residentalType: null,
            numberOfRooms: null,
            floorNumber: null,
            buildingAge: null,
            heatingType: null,
            numberOfFloors: null,
            itemStatus: null,
            itemStatus: null,
            numberOfBathrooms: null,
            status: null,
            studentOrSinglePerson: null,
            front: null,
            intTheSite: null,
            internal: null,
            external: null,
            location: null,
            button: "Kaydet"
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

    save = () => {
        try {
            const form_data = new FormData();
            form_data.append("residentalType", this.state.residentalType)
            form_data.append("numberOfRooms", this.state.numberOfRooms)
            form_data.append("floorNumber", this.state.floorNumber)
            form_data.append("buildingAge", this.state.buildingAge)
            form_data.append("heatingType", this.state.heatingType)
            form_data.append("numberOfFloors", this.state.numberOfFloors)
            form_data.append("itemStatus", this.state.itemStatus)
            form_data.append("numberOfBathrooms", this.state.numberOfBathrooms)
            form_data.append("status", this.state.status)
            form_data.append("studentOrSinglePerson", this.state.studentOrSinglePerson)
            form_data.append("front", this.state.front)
            form_data.append("intTheSite", this.state.intTheSite)
            form_data.append("internal", this.state.internal)
            form_data.append("external", this.state.external)
            form_data.append("location", this.state.location)
            axios.post("adverts-ws/api/advert",
                {
                    headers: { "Authorization": "Bearer" }
                },
                form_data
            )
                .then(() => {
                    Toast.info("İlan onay sürecinde!");
                })
                .catch(() => {
                    this.closeControlPanel()
                    Toast.info('İlan onay sürecinde!', 3);
                })
        }
        catch (e) { console.log(e); }
    }

    settitle = (event) => { this.setState({ title: event }) }
    setcity = (event) => { this.setState({ city: event }) }
    setdistrict = (event) => { this.setState({ district: event }) }
    setregion = (event) => { this.setState({ region: event }) }
    setprice = (event) => { this.setState({ price: parseInt(event) }) }
    setdescription = (event) => { this.setState({ description: event }) }
    setadvertType = (event) => { this.setState({ advertType: event }) }
    setsquareMeter = (event) => { this.setState({ squareMeter: parseInt(event) }) }
    setresidentalType = (event) => { this.setState({ residentalType: event }) }
    setnumberOfRooms = (event) => { this.setState({ numberOfRooms: event }) }
    setfloorNumber = (event) => { this.setState({ floorNumber: parseInt(event) }) }
    setbuildingAge = (event) => { this.setState({ buildingAge: parseInt(event) }) }
    setheatingType = (event) => { this.setState({ heatingType: event }) }
    setnumberOfFloors = (event) => { this.setState({ numberOfFloors: parseInt(event) }) }
    setitemStatus = (event) => { this.setState({ itemStatus: event }) }
    setnumberOfBathrooms = (event) => { this.setState({ numberOfBathrooms: parseInt(event) }) }
    setstatus = (event) => { this.setState({ status: event }) }
    setstudentOrSinglePerson = (event) => { this.setState({ studentOrSinglePerson: event }) }
    sefront = (event) => { this.setState({ ront: event }) }
    setintTheSite = (event) => { this.setState({ intTheSite: event }) }
    setinternal = (event) => { this.setState({ internal: event }) }
    setexternal = (event) => { this.setState({ external: event }) }
    setlocation = (event) => { this.setState({ location: event }) }

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
                <Provider>
                    <Drawer content={
                        <ScrollView>
                            <View>

                                <Button onPress={() => this.closeControlPanel()} type="primary">Kapat</Button>
                                <InputItem
                                    clear
                                    placeholder="title"
                                    onChange={this.settitle}
                                />

                                <InputItem
                                    clear
                                    placeholder="city"
                                    onChange={this.setcity}
                                />
                                <InputItem
                                    clear
                                    placeholder="district"
                                    onChange={this.setdistrict}
                                />
                                <InputItem
                                    clear
                                    placeholder="region"
                                    onChange={this.setregion}
                                />
                                <InputItem
                                    clear
                                    placeholder="price"
                                    onChange={this.setprice}
                                    type="number"
                                />
                                <InputItem
                                    clear
                                    placeholder="description"
                                    onChange={this.setdescription}
                                />
                                <InputItem
                                    clear
                                    placeholder="advertType"
                                    onChange={this.setadvertType}
                                />
                                <InputItem
                                    clear
                                    placeholder="squareMeter"
                                    onChange={this.setsquareMeter}
                                />
                                <InputItem
                                    clear
                                    placeholder="residentalType"
                                    onChange={this.setresidentalType}
                                />
                                <InputItem
                                    clear
                                    placeholder="numberOfRooms"
                                    onChange={this.setnumberOfRooms}
                                />
                                <InputItem
                                    clear
                                    placeholder="floorNumber"
                                    onChange={this.setfloorNumber}
                                />
                                <InputItem
                                    clear
                                    placeholder="buildingAge"
                                    onChange={this.setbuildingAge}
                                />
                                <InputItem
                                    clear
                                    placeholder="heatingType"
                                    onChange={this.setheatingType}
                                />
                                <InputItem
                                    clear
                                    placeholder="numberOfFloors"
                                    onChange={this.setnumberOfFloors}
                                />
                                <InputItem
                                    clear
                                    placeholder="itemStatus"
                                    onChange={this.setitemStatus}
                                />
                                <InputItem
                                    clear
                                    placeholder="numberOfBathrooms"
                                    onChange={this.setnumberOfBathrooms}
                                />
                                <InputItem
                                    clear
                                    placeholder="status"
                                    onChange={this.setstatus}
                                />
                                <InputItem
                                    clear
                                    placeholder="studentOrSinglePerson"
                                    onChange={this.setstudentOrSinglePerson}
                                />
                                <InputItem
                                    clear
                                    placeholder="front"
                                    onChange={this.sefront}
                                />
                                <InputItem
                                    clear
                                    placeholder="intTheSite"
                                    onChange={this.setintTheSite}
                                />
                                <InputItem
                                    clear
                                    placeholder="internal"
                                    onChange={this.setinternal}
                                />
                                <InputItem
                                    clear
                                    placeholder="external"
                                    onChange={this.setexternal}
                                />
                                <InputItem
                                    clear
                                    placeholder="location"
                                    onChange={this.setlocation}
                                />


                                <Button onPress={() => this.save()} style={{ color: "#FFF", backgroundColor: "rgb(180,150,200)" }}>{this.state.button}</Button>
                            </View>
                        </ScrollView>
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
                </Provider>
            );
        } else {
            return <ActivityIndicator />
        }
    }
}