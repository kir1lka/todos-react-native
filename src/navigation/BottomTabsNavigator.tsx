import { RootBottomTabParamList } from "./types";
import WelcomeScreen from "screens/welcomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import CompletedScreen from "screens/completedScreen";
import TodayScreen from "screens/todayScreen";
import CategoriesStackNavigator from "./CategoriesStackNavigator";
import Icons from "components/svg/icons";
import { useTheme } from "@shopify/restyle";

const Tabs = createBottomTabNavigator<RootBottomTabParamList>();

const BottomTabsNavigatort: React.FC = () => {
  const theme = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarInactiveTintColor: theme.colors.gray550,
        tabBarActiveTintColor: "black",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={() => ({
          title: "Главное",
          tabBarIcon: ({ color }) => <Icons name="home" color={color} />,
          headerShown: false,
        })}
      />
      <Tabs.Screen
        name="Completed"
        component={CompletedScreen}
        options={() => ({
          title: "Выполнено",
          tabBarIcon: ({ color }) => <Icons name="completed" color={color} />,
          headerShown: false,
        })}
      />
      <Tabs.Screen
        name="Today"
        component={TodayScreen}
        options={() => ({
          title: "Сегодня",
          tabBarIcon: ({ color }) => <Icons name="calendar" color={color} />,
          headerShown: false,
        })}
      />
      <Tabs.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={() => ({
          title: "Категории",
          tabBarIcon: ({ color }) => <Icons name="categories" color={color} />,
          headerShown: false,
        })}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabsNavigatort;
