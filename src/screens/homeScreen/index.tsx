import React, { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import { Box, Text } from "utils/theme";
import {
  AuthStackParamList,
  CategoriesStackParamList,
  HomeStackParamList,
} from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import { useAppDispatch, useAppSelector } from "components/general/Hooks";
import { removeAccessToken } from "store/authSlice";
import { removeUser } from "store/userSlice";
import NavigateBack from "components/general/NavigateBack";
import InputCreateTask from "components/general/InputCreateTask";
import TaskSkeleton from "components/categories/TaskSkeleton";
import Task from "components/categories/Task";
import Button from "components/button/Button";
import { ErrorList } from "components/general/ErrorList";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;

type CategoryScreenRouteProp = RouteProp<CategoriesStackParamList, "Category">;

type ErrorState = {
  [key: string]: string[];
};

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  const user = useAppSelector((state) => state.user.user);

  const route = useRoute<CategoryScreenRouteProp>();

  // const { category } = route.params;

  const [errors, setErrors] = useState<ErrorState>();

  const navigation = useNavigation<HomeScreenNavigationProp>();

  // const navigateToEditTask = () => {
  //   navigation.navigate("EditTask");
  // };

  const onLogout = () => {
    dispatch(removeAccessToken());
    dispatch(removeUser());
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="5">
        <Text variant="text3Xl" fontWeight={700} mt="4" mb="4">
          Задачи
        </Text>
        {/* <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt="4"
          mb="6"
        >
          <NavigateBack />
        </Box> */}
        {/* <ScrollView style={{ flex: 1 }}> */}
        {/* <Box flexDirection="row" mb="4">
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

        {errors && Object.keys(errors).length > 0 && (
          <Box mb="4">
            <ErrorList errors={errors} />
          </Box>
        )}
        <Box mb="2">
          <InputCreateTask
            textHolder="Создать задачу"
            categotyId={category.id}
            userId={user?.id || 0}
          />
        </Box> */}

        {loading && (
          <Box flex={1}>
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </Box>
        )}

        {!loading && (
          <>
            {false ? (
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
        {/* </ScrollView> */}
      </Box>

      {/* <Box flex={1} backgroundColor="red100">
        <Text variant="textBase" onPress={onLogout}>
          HomeScreen
        </Text>
      </Box> */}
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
