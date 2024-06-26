import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./AuthStackNavigator";
import AppStackNavigator from "./AppStackNavigator";
import { useAppDispatch, useAppSelector } from "components/general/Hooks";
import { useEffect } from "react";
import { getUser } from "store/userSlice";
import { setAccessToken } from "axios/AxiosClient";

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!user.user && token) {
      dispatch(getUser());
    }
    if (token) {
      setAccessToken(token);
    }
  }, []);

  return (
    <NavigationContainer>
      {!token ? <AuthStackNavigator /> : <AppStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
