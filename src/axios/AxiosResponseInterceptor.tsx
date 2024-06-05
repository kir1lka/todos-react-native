import axiosManager from "./AxiosClient";
import store from "../store/index";
import { removeAccessToken } from "../store/authSlice";

axiosManager.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      store.dispatch(removeAccessToken());
    }
    throw error;
  }
);
