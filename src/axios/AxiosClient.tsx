import axios from "axios";

const axiosManager = axios.create({
  baseURL: `https://32cb-95-71-23-30.ngrok-free.app/api`,
});

let accessToken = "";

export const setAccessToken = (token: string) => {
  accessToken = token;
};

axiosManager.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosManager;

// import axios from "axios";
// import store from "./src/store/index";
// import { removeAccessToken } from "./src/store/authSlice";

// const axiosManager = axios.create({
//   baseURL: `http://127.0.0.1:8001/api`,
// });

// axiosManager.interceptors.request.use((config) => {
//   const state = store.getState();
//   const token = state.auth.accessToken;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axiosManager.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const { response } = error;
//     if (response.status === 401) {
//       store.dispatch(removeAccessToken());
//     }
//     throw error;
//   }
// );

// export default axiosManager;
