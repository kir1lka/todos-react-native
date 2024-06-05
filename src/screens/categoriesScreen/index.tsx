import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import { useAppDispatch, useAppSelector } from "components/general/Hooks";
import { geAllCategories } from "store/categoriesSlice";
import Loader from "components/general/Loader";
import { FlatList } from "react-native";
import Category from "components/categories/Category";
import Button from "components/button/Button";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "Categories"
>;

const CategoriesScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  const { categories, loading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(geAllCategories());
  }, [dispatch]);

  //functions
  const navigateToCreateCategory = () => {
    navigation.navigate("CreateCategory", {});
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="5">
        <Text variant="text2Xl" fontWeight={700} mb="6.5">
          Категории
        </Text>
        <FlatList
          data={categories}
          renderItem={({ item }) => <Category item={item} />}
          showsVerticalScrollIndicator={false}
        />
        <Box mb="4">
          <Button
            label="Создать категорию"
            onPress={navigateToCreateCategory}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoriesScreen;
