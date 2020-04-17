import axios from "axios";
import { API_URL } from "../../config/api_url";

let instance = axios.create({
	baseURL: API_URL,
	responseType: "json"
});

export default instance;
