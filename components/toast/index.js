import Toast from "react-native-toast-message";

export default {
	error: (message) => {
		return Toast.show({
			type: "error",
			position: "bottom",
			text1: "Hata",
			text2: message
		});
	},
	info: (message) => {
		return Toast.show({
			type: "info",
			position: "bottom",
			text1: "Bilgilendirme",
			text2: message
		});
	},
	success: (message) => {
		return Toast.show({
			type: "success",
			position: "bottom",
			text1: "Başarılı",
			text2: message
		});
	}
}