import { createStackNavigator } from "@react-navigation/stack";
import { CategoriesStackParamList } from "./types";
import HomeScreen from "screens/homeScreen";
import EditTask from "screens/editTaskScreen";
import CategoriesScreen from "screens/categoriesScreen";
import CategoryScreen from "screens/categoryScreen";
import CreateCategotyScreen from "screens/createCategory";
import EditCategoryScreen from "screens/editCategoryScreen";

const Stack = createStackNavigator<CategoriesStackParamList>();

const CategoriesStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateCategory"
        component={CreateCategotyScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditCategory"
        component={EditCategoryScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoriesStackNavigator;
