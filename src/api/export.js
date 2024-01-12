import request from "@/utils/fileRequest";
function apiAxios(method, url, params) {
  return request({
    method: method,
    url: url,
    data:
      method === "POST" || method === "PUT" || method === "DELETE"
        ? params
        : null,
    params: method === "GET" ? params : null
    // headers: headers,
    // withCredentials: false
  });
}
export default {
  get: function(vue, path, params) {
    return apiAxios("GET", path, params);
  },
  post: function(vue, path, params) {
    return apiAxios("POST", path, params);
  },
  put: function(vue, path, params) {
    return apiAxios("PUT", path, params);
  },
  delete: function(vue, path, params) {
    return apiAxios("DELETE", path, params);
  }
};
