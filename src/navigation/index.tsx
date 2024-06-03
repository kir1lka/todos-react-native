import { NavigationContainer } from "@react-navigation/native";
import { Box, Text } from "utils/theme";
import AuthStackNavigator from "./AuthStackNavigator";

const Navigation: React.FC = () => {
  const user = true;

  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
