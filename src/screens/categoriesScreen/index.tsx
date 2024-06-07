import React, { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import { useAppDispatch, useAppSelector } from "components/general/Hooks";
import { getAllCategories } from "store/categoriesSlice";
import Loader from "components/general/Loader";
import { FlatList, RefreshControl, ScrollView } from "react-native";
import Category from "components/categories/Category";
import Button from "components/button/Button";
import CategorySkeleton from "components/categories/CategorySkeleton";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "Categories"
>;

const CategoriesScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  const { categories, loading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  //functions
  const navigateToCreateCategory = () => {
    navigation.navigate("CreateCategory", {});
  };

  const handleRefresh = useCallback(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="5">
        <Text variant="text3Xl" fontWeight={700} mt="4" mb="4">
          Категории
        </Text>
        {loading && (
          <Box flex={1}>
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
          </Box>
        )}

        {!loading && (
          <>
            {categories.length > 0 ? (
              <FlatList
                data={categories}
                renderItem={({ item }) => <Category item={item} />}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={handleRefresh}
                  />
                }
              />
            ) : (
              <Box flex={1} justifyContent="center" alignItems="center">
                <Text variant="textXl" fontWeight={500}>
                  🤔 Нет категорий?{" "}
                  <Text
                    variant="textXl"
                    fontWeight={500}
                    color="primary"
                    textDecorationLine="underline"
                    onPress={navigateToCreateCategory}
                  >
                    Cоздайте их!
                  </Text>
                </Text>
              </Box>
            )}
          </>
        )}

        <Box mb="2" mt="2">
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
