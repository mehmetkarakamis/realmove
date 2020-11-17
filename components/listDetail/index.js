import React from "react";
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import TopNavigation from "../top-navigation";
import { Button, Icon, List, ListItem, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native";


const renderItemAccessory = () => (
	<Button size="small">Gözat</Button>
);

const renderItemIcon = (props) => (
	<Icon name="home" {...props} />
);

const renderItem = ({ item }) => (
	<ListItem
		title={item.title}
		description={item.description}
		accessoryLeft={renderItemIcon}
        accessoryRight={renderItemAccessory}
	/>
);


class ListDetail extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			advertList: [],
		}
	}

	componentDidMount(){
		this.requestLogin();
	}

	requestLogin = () => {
		axios.get("/adverts-ws/api/advert/all", {
			headers: {
				'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjODAyMTBiOC1mNmU2LTRhMzMtOWIxMS0yODhjMTE4Y2FmMTEiLCJleHAiOjE2MDY0NjIyMjZ9.pQLuMWQ64eCnu235265i1-h-RNmhNQjhvFGi9dRY5dk8jCHApkd6ULN1p7It28y6mn231x69rMjKBNYJ36vV8g'
			}
		})
		.then(async(response) => {
			console.log("başarıyla alında");
			console.log(response.data);
			const advertList = response.data;
			this.setState({ advertList });
		})
		.catch((err) => {
			console.log(err);
			console.log("catch");
		})
	}
	render() {
		return (
			<>
				<TopNavigation title="Arama" />
					<Text>Deneme</Text>
				<BottomBar />
			</>
		);
	}
}

export default ListDetail;