import React, { useCallback, useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, RefreshControl } from "react-native";
import { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import { getShowTasksForCategory } from "store/tasksSlice";
import { useAppDispatch, useAppSelector } from "components/general/Hooks";
import Spinner from "react-native-loading-spinner-overlay";
import Loader from "components/general/Loader";
import NavigateBack from "components/general/NavigateBack";
import Input from "components/input/Input";
import InputCreateTask from "components/general/InputCreateTask";
import Category from "components/categories/Category";
import Task from "components/categories/Task";
import Button from "components/button/Button";

// type CategoryScreenNavigationProp = NativeStackNavigationProp<
//   CategoriesStackParamList,
//   "Category"
// >;

type CategoryScreenRouteProp = RouteProp<CategoriesStackParamList, "Category">;

const CategoryScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const user = useAppSelector((state) => state.user.user);

  const route = useRoute<CategoryScreenRouteProp>();

  const { category } = route.params;

  // const navigation = useNavigation<CategoryScreenNavigationProp>();

  //   const navigateToHome = () => {
  //     navigation.navigate("Home");
  //   };

  useEffect(() => {
    dispatch(getShowTasksForCategory(category.id));
  }, []);

  const handleRefresh = useCallback(() => {
    dispatch(getShowTasksForCategory(category.id));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="5">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt="4"
          mb="6"
        >
          <NavigateBack />
        </Box>
        <Box flexDirection="row" mb="4">
          <Text variant="text2Xl" fontWeight={700} mr="1">
            {category.icon?.symbol}
          </Text>
          <Text
            variant="text2Xl"
            fontWeight={700}
            style={{
              color: category.color_category?.code,
            }}
          >
            {category.name}
          </Text>
        </Box>
        <Box mb="4">
          <InputCreateTask
            textHolder="Создать задачу"
            categotyId={category.id}
            userId={user?.id || 0}
          />
        </Box>
        {!loading && (
          <>
            {tasks.length > 0 ? (
              <FlatList
                data={tasks}
                renderItem={({ item }) => <Task item={item} />}
                showsVerticalScrollIndicator={false}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={loading}
                //     onRefresh={handleRefresh}
                //   />
                // }
              />
            ) : (
              <Box flex={1} justifyContent="center" alignItems="center">
                <Text variant="textXl" fontWeight={500}>
                  🤔 Нет задач?{" "}
                  <Text
                    variant="textXl"
                    fontWeight={500}
                    color="primary"
                    textDecorationLine="underline"
                    // onPress={navigateToCreateCategory}
                  >
                    Cоздайте их!
                  </Text>
                </Text>
              </Box>
            )}
          </>
        )}
        <Box mb="2" mt="2">
          <Button label="Создать задачу" onPress={() => console.log()} />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoryScreen;
