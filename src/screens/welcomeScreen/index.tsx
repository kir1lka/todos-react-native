import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";
import { AuthStackParamList } from "navigation/types";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Welcome"
>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <Box>
      <Text variant="textBase">WelcomeScreen</Text>
      <Button title="to login" onPress={navigateToLogin} />
    </Box>
  );
};

export default WelcomeScreen;
