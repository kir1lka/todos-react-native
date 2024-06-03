import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import theme, { Box, Text } from "utils/theme";
import { AuthStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import Button from "components/button/Button";
import { TextInput, TouchableOpacity } from "react-native";
import Input from "components/input/Input";
import { useRef } from "react";

type SignupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const navigateToSignup = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="5" mt="13">
        <Text variant="text2Xl" fontWeight={700}>
          Добро пожаловать!
        </Text>
        <Text variant="text2Xl" fontWeight={700}>
          Здесь все начинается
        </Text>

        <Input textHolder="Почта" keyboardType="email-address" />
        <Input textHolder="Пароль" />
        <Input textHolder="Подтверждение пароля" />

        <Box mt="6.5" width={250} alignSelf="center">
          <Button onPress={() => console.log("123")} label="Регистрация" />
        </Box>

        <Box justifyContent="flex-end" flex={1} mb="6">
          <Text variant="textLg" textAlign="center" fontWeight={500}>
            Есть аккаунт?{" "}
            <Text
              variant="textLg"
              color="primary"
              textDecorationLine="underline"
              fontWeight={700}
              onPress={navigateToSignup}
            >
              Войти
            </Text>
          </Text>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;
