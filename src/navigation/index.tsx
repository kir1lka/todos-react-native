import { NavigationContainer } from "@react-navigation/native";
import { Box, Text } from "utils/theme";
import AuthStackNavigator from "./AuthStackNavigator";
import AppStackNavigator from "./AppStackNavigator";

const Navigation: React.FC = () => {
  const user = true;

  return (
    <NavigationContainer>
      {/* <AuthStackNavigator /> */}
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
