import axios from "axios";

const BASE_URL = "http://a0392ee70744.ngrok.io";

export default axios.create({
  baseURL: BASE_URL,
});
