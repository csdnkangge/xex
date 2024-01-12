import axios from "axios";
import store from "../store";
import { getToken } from "@/utils/auth";
let baseURL = window.g.baseUrl // 获取baseurl
const fileService = axios.create({
  baseURL,
  responseType: "blob",
  timeout: 600000 // 请求超时时间
});
fileService.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["access-token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // config.headers["X-Page-Url"] = location.href;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
fileService.interceptors.response.use(
  res => {
    console.log(res);
    if (res.headers["content-disposition"].indexOf(".xlsx") > 0) {
      return res;
    } else if (res.data.type === "application/json") {
      return new Promise((resolve, reject) => {
        let err = {};
        let reader = new FileReader();
        reader.readAsText(res.data);
        reader.onload = e => {
          err = JSON.parse(e.target.result);
          return reject(err);
        };
      });
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  }
);
export default fileService;
