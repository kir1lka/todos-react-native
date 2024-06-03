import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Text } from "utils/theme";
import { AuthStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import Input from "components/input/Input";
import Button from "components/button/Button";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="5" mt="13">
        <Text variant="text2Xl" fontWeight={700}>
          Добро пожаловать!
        </Text>

        <Input textHolder="Почта" keyboardType="email-address" />
        <Input textHolder="Пароль" />

        <Box mt="6.5" width={250} alignSelf="center">
          <Button onPress={() => console.log("123")} label="Авторизация" />
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
              Регистрация
            </Text>
          </Text>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
