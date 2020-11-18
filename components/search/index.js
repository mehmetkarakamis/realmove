import React from "react";
import BottomBar from "../bottom-bar";
import TopNavigation from "../top-navigation";
import { Button, Icon, Input, List, ListItem } from "@ui-kitten/components";
import Jason from "../../adverts.json"


const renderItemAccessory = () => (
	<Button size="small">Gözat</Button>
);

const renderItemIcon = (props) => (
	<Icon name="home" {...props} />
);

const renderItem = ({ item }) => (
	<ListItem
		title={item.name}
		description={item.shortDesc}
		accessoryLeft={renderItemIcon}
		accessoryRight={renderItemAccessory}
	/>
);


class Search extends React.PureComponent {
	constructor() {
		super();
		this.state = {
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
						data={Jason.filter((item) => { return item.name.toLowerCase().includes(this.state.value.toLowerCase()); })}
						renderItem={renderItem}
					/>
				<BottomBar index={2} navigation={this.props.navigation} />
			</>
		);
	}
}

export default Search;