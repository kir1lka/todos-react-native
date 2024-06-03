import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";

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
    <SafeAreaWrapper>
      <Box>
        <Text variant="textBase">CategoryScreen</Text>
        {/* <Button title="to home" onPress={navigateToHome} /> */}
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoryScreen;
