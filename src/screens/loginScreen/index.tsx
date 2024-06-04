import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Text } from "utils/theme";
import { AuthStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import Input from "components/input/Input";
import Button from "components/button/Button";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} mx="5" justifyContent="center">
            <Text variant="text2Xl" fontWeight={700}>
              Добро пожаловать!
            </Text>

            <Input
              textHolder="Почта"
              keyboardType="email-address"
              error={isError}
            />
            <Input textHolder="Пароль" error={isError} password={true} />

            <Box mt="6.5" width="100%" alignSelf="center" mb="13">
              <Button
                onPress={() => setIsError(!isError)}
                label="Авторизация"
              />
            </Box>
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
