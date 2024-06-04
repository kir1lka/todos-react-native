import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import theme, { Box, Text } from "utils/theme";
import { AuthStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import Button from "components/button/Button";
import {
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Input from "components/input/Input";
import { useRef, useState } from "react";

type SignupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

const SignupScreen: React.FC = () => {
  const [isError, setIsError] = useState(false);

  const navigation = useNavigation<SignupScreenNavigationProp>();

  const navigateToSignup = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} mx="5" justifyContent="center">
            <Text variant="text2Xl" fontWeight={700}>
              Добро пожаловать!
            </Text>
            <Text variant="text2Xl" fontWeight={700}>
              Здесь все начинается
            </Text>

            <Input
              textHolder="Почта"
              keyboardType="email-address"
              error={isError}
            />
            <Input textHolder="Пароль" error={isError} password={true} />
            <Input
              textHolder="Подтверждение пароля"
              error={isError}
              password={true}
            />

            <Box mt="6.5" width="100%" alignSelf="center" mb="13">
              <Button
                onPress={() => setIsError(!isError)}
                label="Регистрация"
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
                Войти
              </Text>
            </Text>

            {/* <Box justifyContent="flex-end" flex={1} mb="6">
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
            </Box> */}
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;
