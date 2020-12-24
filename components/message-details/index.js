import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import Loading from "../loading/index.js";
import Toast from "../toast";
import TopNavigation from "../top-navigation";
import Types from "../../utils/Types.js";
import { Button, Divider, Icon, List, ListItem } from "@ui-kitten/components";
import { Image, StyleSheet, View } from "react-native";
import { Pages } from "react-native-pages";
import { GiftedChat } from 'react-native-gifted-chat'

class MessageDetails extends React.PureComponent {
    
	constructor() {
		super();
		this.state = {
			messages: [],
			loading: false,
			userId: "",
		}
	}

	componentDidMount() {
		this.getMessages(this.props.route?.params?.id);
		setInterval(() => {
			this.getMessages(this.props.route?.params?.id);
		}, 3000);
		this.requestUser();
    }
    
    

	getMessages = (id) => {
		this.setState({ loading: true }, async() => {
			axios.get(`/users-ws/api/messages/getConversationMessages?conversationId=${id}`, {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
			})
			.then((response) => {    
				  this.setState({ messages:  response.data.messageList, advertId: response.data.advertId, toUserId: response.data.toUserId});
                console.log(response.data.messageList);
			})
			.catch((err) => {
                console.log(err);
                console.log("aq");
				Toast.error("Mesajlar getirilemedi!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
	}
	
	onSend = async(messages) => {
		const data = new FormData();
		data.append("fromUserId", this.state.userId);
		data.append("toUserId", this.state.toUserId);
		data.append("Content", messages[0].text);
		data.append("advertId", this.state.advertId);
		axios.post("/users-ws/api/messages", data, {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}` }
		})
		.then(() => {
				Toast.success("Mesajınız gönderildi!");
				this.getMessages(this.props.route?.params?.id);
		})
		.catch((err) => {
			console.log(JSON.stringify(err.response), null, 2);
			Toast.error("Mesajınız gönderilemedi!");
		});
	}

	
	requestUser = () => {
		this.setState({ loading: true }, async() => {
            console.log("reques user token")
            console.log(await AsyncStorage.getItem("@token"));
			axios.get("/users-ws/api/user", {
				headers: { "Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`}
			})
			.then((response) => {
                this.setState({ userId: response.data.userId });
				console.log(response.data);
				console.log("useridyavvv");
				console.log(this.state.userId);
			})
			.catch(() => {
                
				Toast.error("Sunucuya bağlanırken hata ile karşılaşıldı USER ID için!");
			})
			.finally(() => { this.setState({ loading: false }); });
		});
    }


	starIcon = (props) => <Icon {...props} name="star" />

	render() {
		return (
			<GiftedChat
			onSend={e => this.onSend(e) }
			placeholder="Mesajınızı yazın"
			alwaysShowSend ={true}
			inverted={false}
			messages={this.state.messages.map((message) => ({
			  _id: message.id,
			  createdAt: message.dateTime,
			  text: message.content,
			  user: {
				_id: message.userId,
				name: "Omercan",
				avatar: ""
			  }
			}))}
			user={{
			  _id: this.state.userId
			}}
		  />
		);
	}
}

export default MessageDetails;