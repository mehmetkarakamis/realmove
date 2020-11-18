import React from "react";
import BottomBar from "../bottom-bar";
import TopNavigation from "../top-navigation";
import { Button, Icon, Input, List, ListItem } from "@ui-kitten/components";

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


class Search extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			data:
				[
					{
						title: "Konut 1",
						description: "Konut 1 açıklaması"
					},
					{
						title: "Konut 2",
						description: "Konut 2 açıklaması"
					},
					{
						title: "Konut 3",
						description: "Konut 3 açıklaması"
					}
				],
				value: ""
		}
	}

	setValue = event => { this.setState({ value: event }); }

	render() {
		return (
			<>
				<TopNavigation title="Arama" />
				<Input  onChangeText={this.setValue} value={this.state.value} placeholder="Aranacak kelime giriniz" />
					<List
						data={this.state.data.filter((item) => { return item.description.includes(this.state.value); })}
						renderItem={renderItem}
					/>
				<BottomBar index={2} navigation={this.props.navigation} />
			</>
		);
	}
}

export default Search;