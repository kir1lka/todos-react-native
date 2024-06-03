import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";
import { AuthStackParamList, HomeStackParamList } from "navigation/types";

type EditTaskScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;

const EditTaskScreen: React.FC = () => {
  const navigation = useNavigation<EditTaskScreenNavigationProp>();

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <Box>
      <Text variant="textBase">EditTaskScreen</Text>
      <Button title="to home" onPress={navigateToHome} />
    </Box>
  );
};

export default EditTaskScreen;
