import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "./types";
import WelcomeScreen from "screens/welcomeScreen";
import LoginScreen from "screens/loginScreen";
import SignupScreen from "screens/signupScreen";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default AuthStackNavigator;
