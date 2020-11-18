import React from "react";
import BottomBar from "../bottom-bar";
import TopNavigation from "../top-navigation";
import { Button, Icon, List, ListItem } from "@ui-kitten/components";

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
	render() {
		return (
			<>
				<TopNavigation title="Arama" />
					<List
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
				<BottomBar index={2} navigation={this.props.navigation} />
			</>
		);
	}
}

export default Search;