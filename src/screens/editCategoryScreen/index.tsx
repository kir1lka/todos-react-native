import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";

type EditCategoryNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "EditCategory"
>;

const EditCategoryScreen: React.FC = () => {
  const navigation = useNavigation<EditCategoryNavigationProp>();

  //   const navigateToHome = () => {
  //     navigation.navigate("Home");
  //   };

  return (
    <Box>
      <Text variant="textBase">EditCategory</Text>
      {/* <Button title="to home" onPress={navigateToHome} /> */}
    </Box>
  );
};

export default EditCategoryScreen;
