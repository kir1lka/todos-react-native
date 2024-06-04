import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";
import { HomeStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import { useAppDispatch } from "components/general/Hooks";
import { removeAccessToken } from "store/authSlice";
import { removeUser } from "store/userSlice";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToEditTask = () => {
    navigation.navigate("EditTask");
  };

  const onLogout = () => {
    dispatch(removeAccessToken());
    dispatch(removeUser());
  };

  return (
    <SafeAreaWrapper>
      <Box>
        <Text variant="textBase">HomeScreen</Text>
        <Button title="to editTask" onPress={navigateToEditTask} />
        <Button title="onLogout" onPress={onLogout} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
