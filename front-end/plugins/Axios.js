import axios from "axios";
import { API } from "../Config.js"

export default axios.create({
	baseURL: API
});