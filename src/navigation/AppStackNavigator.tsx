import { createStackNavigator } from "@react-navigation/stack";
import { AppStackParamList } from "./types";
import BottomTabsNavigatort from "./BottomTabsNavigator";

const Stack = createStackNavigator<AppStackParamList>();

const AppStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabsNavigatort}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
