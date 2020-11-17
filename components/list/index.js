import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "../../utils/Axios.js";
import BottomBar from "../bottom-bar";
import TopNavigation from "../top-navigation";
import { Button, Icon, List as KittenList, ListItem } from "@ui-kitten/components";

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

class List extends React.PureComponent {
	componentDidMount() {
		this.getList();
		console.log(1);
	}

	getList = async() => {
		axios.get("/advert-ws/api/advert", {
			headers: {
				"Authorization": `Bearer ${await AsyncStorage.getItem("@token")}`
			}
		})
		.then(response => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error);
		})
	}

	render() {
		return (
			<>
				<TopNavigation title="Vitrin" />
					<KittenList
						data={
							[
								{
									title: "Konut 1",
									description: "Konut 1 açıklaması"
								},
								{
									title: "Konut 2",
									description: "Konut 2 açıklaması"
								}
							]
						}
						renderItem={renderItem}
					/>
				<BottomBar index={0} navigation={this.props.navigation} />
			</>
		);
	}
}

export default List;