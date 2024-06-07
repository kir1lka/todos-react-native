import React from "react";
import { ICategory } from "store/types";
import theme, { Box, Text } from "utils/theme";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "navigation/types";
import { useNavigation } from "@react-navigation/native";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "Categories"
>;

type CategoryProps = {
  item: ICategory;
};

const Category: React.FC<CategoryProps> = ({ item }) => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  const navigateCategoryScreen = () => {
    navigation.navigate("Category", {
      id: item.id,
    });
  };

  const navigateCreateCategory = () => {
    navigation.navigate("CreateCategory", {
      category: item,
    });
  };
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={navigateCategoryScreen}>
      <Box p="4" backgroundColor="gray250" borderRadius="rounded-2xl" mb="3.5">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flexDirection="row">
            <Text variant="textLg" fontWeight={500} mr="2">
              {item.icon?.symbol}
            </Text>
            <Text variant="textLg" fontWeight={500}>
              {item.name}
            </Text>
          </Box>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={navigateCreateCategory}
          >
            <Box backgroundColor="primary" p="2" borderRadius="rounded-2xl">
              <Entypo
                name="dots-three-vertical"
                size={16}
                color={theme.colors.white}
              />
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Category;
