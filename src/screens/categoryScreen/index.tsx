import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";

// type CategoryScreenNavigationProp = NativeStackNavigationProp<
//   CategoriesStackParamList,
//   "Category"
// >;

type CategoryScreenRouteProp = RouteProp<CategoriesStackParamList, "Category">;

const CategoryScreen: React.FC = () => {
  const route = useRoute<CategoryScreenRouteProp>();
  // const navigation = useNavigation<CategoryScreenNavigationProp>();

  //   const navigateToHome = () => {
  //     navigation.navigate("Home");
  //   };

  return (
    <SafeAreaWrapper>
      <Box>
        <Text variant="textBase">CategoryScreen</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoryScreen;
