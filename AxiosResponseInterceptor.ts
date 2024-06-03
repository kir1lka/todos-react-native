import axiosManager from "./AxiosClient";
import store from "./src/store/index";
import { removeAccessToken } from "./src/store/authSlice";

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