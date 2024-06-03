import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "./types";
import WelcomeScreen from "screens/welcomeScreen";
import LoginScreen from "screens/loginScreen";
import SignupScreen from "screens/signupScreen";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator: React.FC = () => {
  const user = true;

  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
