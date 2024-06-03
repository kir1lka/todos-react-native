import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";

type CategoryScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "Category"
>;

const CategoryScreen: React.FC = () => {
  const navigation = useNavigation<CategoryScreenNavigationProp>();

  //   const navigateToHome = () => {
  //     navigation.navigate("Home");
  //   };

  return (
    <Box>
      <Text variant="textBase">CategoryScreen</Text>
      {/* <Button title="to home" onPress={navigateToHome} /> */}
    </Box>
  );
};

export default CategoryScreen;
