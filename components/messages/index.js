import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Loading from "../loading/index.js";
import Toast from "../toast";
import TopNavigation from "../top-navigation";
import { Button, List as UIList, ListItem, Text } from "@ui-kitten/components";
import { Image, RefreshControl, SafeAreaView, StyleSheet, View } from "react-native";

class Messages extends React.Component {
	constructor() {
		super();
		this.state = {
			advert_list: [],
			loading: false
		}
	}

	componentDidMount(){
        this.requestUser();
		
	}
	
	renderItemRight = (id) => () => (
		<Button onPress={() => this.props.navigation.navigate("MessageDetails", { id })} size="small">Oku</Button>
	);


    requestUser = () => {
		this.setState({ loading: true }, async() => {
            console.log("reques user token")
            console.log(await AsyncStorage.getItem("@token"));
			axios.get("/users-ws/api/user", {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
			})
			.then((response) => {
                this.setState({ user_id: response.data.userId });
                console.log(response.data);
                this.requestMessages();
			})
			.catch(() => {
                
				Toast.error("Sunucuya bağlanırken hata ile karşılaşıldı!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
    }
    
	requestMessages = () => {
		this.setState({ loading: true }, async() => {
			axios.get(`/users-ws/api/messages/getConversationList?userId=${this.state.user_id}`, {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
            })
			.then((response) => {
                this.setState({ messages: response.data });
                console.log(response.data);
			})
			.catch(() => {
                console.log("hataaaa");
				Toast.error("Sunucuya bağlanırken hata ile karşılaşıldı!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}

	render() {
		return (
			<SafeAreaView>
			<Loading loading={this.state.loading}>
				<View style={CSS.list}>
					<TopNavigation title="Mesajlar" navigation={this.props.navigation} />

					<UIList
						data={this.state.messages}
						renderItem={({ item }) => {
							return <ListItem
								accessoryRight={this.renderItemRight(item.conversationId)}
								description=
								{<View>
									<Text appearance="hint" category="p2">{item.messageList[0].content}</Text>
                                    <Text appearance="hint" category="p2">{item.messageList[0].dateTime}</Text>
								</View>}
							/>
						}}
					/>

					<BottomBar index={4} navigation={this.props.navigation} />
				</View>
			</Loading>
			</SafeAreaView>
		);
	}
}

const CSS = StyleSheet.create({
	list: {
		height: "100%"
	},
	property_image: {
		height: 75,
		width: 75
	}
});

export default Messages;