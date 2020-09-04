import axios from "axios";
import { API_URL } from "../../config/api_url";

let instance = axios.create({
  baseURL: API_URL,
  responseType: 'json',
/*  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },*/
});

export default instance;
