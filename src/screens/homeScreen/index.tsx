import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";
import { HomeStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToEditTask = () => {
    navigation.navigate("EditTask");
  };

  return (
    <SafeAreaWrapper>
      <Box>
        <Text variant="textBase">HomeScreen</Text>
        <Button title="to editTask" onPress={navigateToEditTask} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
