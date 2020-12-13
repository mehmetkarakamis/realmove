import React from "react";
import BottomBar from "../bottom-bar";
import TopNavigation from "../top-navigation";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Input, Select, SelectItem } from '@ui-kitten/components';

class Add extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: true
		}
	}

	render() {
		return (
			<>
				<TopNavigation title="Yeni İlan Ekle" navigation={this.props.navigation} />

				<ScrollView>
					<View style={CSS.container}>
						<Input
							placeholder="İlan için bir başlık giriniz"
							label="Başlık"
						/>

						<Select label="Şehir" placeholder="Bir şehir giriniz">
							<SelectItem title="Ankara" />
						</Select>

						<Select label="İlçe" placeholder="Bir ilçe giriniz">
							<SelectItem title="Akyurt" />
							<SelectItem title="Altındağ" />
							<SelectItem title="Ayaş" />
							<SelectItem title="Bağla" />
							<SelectItem title="Beypazarı" />
							<SelectItem title="Çamlıdere" />
							<SelectItem title="Çankaya" />
							<SelectItem title="Çubuk" />
							<SelectItem title="Elmadağ" />
							<SelectItem title="Etimesgut" />
							<SelectItem title="Evren" />
							<SelectItem title="Gölbaşı" />
							<SelectItem title="Güdül" />
							<SelectItem title="Haymana" />
							<SelectItem title="Kahramankazan" />
							<SelectItem title="Kalecik" />
							<SelectItem title="Keçiören" />
							<SelectItem title="Kızılcahamam" />
							<SelectItem title="Mamak" />
							<SelectItem title="Nallıhan" />
							<SelectItem title="Polatlı" />
							<SelectItem title="Pursaklar" />
							<SelectItem title="Şereflikoçhisar" />
							<SelectItem title="Sincan" />
							<SelectItem title="Yenimahalle" />
						</Select>

						<Input
							placeholder="Bir fiyat giriniz"
							label="Fiyat"
						/>

						<Input
							label="Açıklama"
							multiline={true}
							placeholder="Bir açıklama giriniz"
							textStyle={{ minHeight: 128 }}
						/>

						<Select label="İlan türü" placeholder="İlan türünü giriniz">
							<SelectItem title="Satılık" />
							<SelectItem title="Kiralık" />
						</Select>

						<Input
							label="Metrekare"
							placeholder="Bir metrekare değeri giriniz"
						/>

						<Input
							label="Konut tipi"
							placeholder="Konut tipini giriniz"
						/>

						<Input
							label="Oda + salon sayısı"
							placeholder="Örn. 2+1, 3+1"
						/>

						<Input
							label="Bina kat sayısı"
							placeholder="Bina kat sayısını giriniz"
						/>

						<Input
							label="Kat"
							placeholder="Dairenin kaçıncı katta olduğunu giriniz"
						/>

						<Input
							label="Bina yaşı"
							placeholder="Bina yaşını giriniz"
						/>

						<Input
							label="Banyo sayısı"
							placeholder="Banyo sayısını giriniz"
						/>

						<Select label="Daire durumu" placeholder="Daire durumunu giriniz">
							<SelectItem title="Sıfır" />
							<SelectItem title="İkinci El" />
						</Select>

						<Input
							label="Cephe"
							placeholder="Evin cephesini giriniz"
						/>

						<Select label="Site" placeholder="Site içinde mi?">
							<SelectItem title="Evet" />
							<SelectItem title="Hayır" />
						</Select>

						<View style={CSS.button_container}>
							<Button size="small" style={CSS.button}>Önizle</Button>
							<Button size="small" status="danger" style={CSS.button}>Gönder</Button>
						</View>
					</View>
				</ScrollView>

				<BottomBar index={99} navigation={this.props.navigation} />
			</>
		);
	}
}

const CSS = StyleSheet.create({
	container: {
		padding: "2%"
	},
	button_container: {
		marginTop: "3%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%"
	},
	button: {
		width: "40%"
	}
});

export default Add;