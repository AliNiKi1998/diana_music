import axios from "axios";

import { errorMessage } from './../utils/message';

axios.defaults.headers.post["Content-Type"] = "application/json";

// const token = localStorage.getItem("user_token");

// console.log(token);
// if(token) axios.defaults.headers.post["Authorization"] = `Bearer ${token}`;

axios.interceptors.response.use(null, error => {
    const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedErrors) {
        errorMessage("مشکلی از سمت سرور رخ داده است");
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
