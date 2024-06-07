import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Text } from "utils/theme";
import { AuthStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import Input from "components/input/Input";
import Button from "components/button/Button";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { ErrorList } from "components/general/ErrorList";
import axiosManager, { setAccessToken } from "axios/AxiosClient";
import { useAppDispatch } from "components/general/Hooks";
import { setUser } from "store/userSlice";
import { addAccessToken } from "store/authSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type ErrorState = {
  [key: string]: string[];
};

type Payload = {
  email: string | undefined;
  password: string | undefined;
};

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  //function
  const onSubmit = () => {
    setIsLoading(true);

    const payload: Payload = {
      email: email,
      password: password,
    };

    console.log(password);

    axiosManager
      .post("/login", payload)
      .then((res) => {
        dispatch(setUser(res.data.user));
        dispatch(addAccessToken(res.data.token));
        setAccessToken(res.data.token);
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        const res = err.response;
        console.log(err);

        if (res && res.status === 422) {
          if (res.data.errors) {
            setErrors(res.data.errors);
          } else {
            setErrors({
              email: [res.data.message],
            });
          }
        }
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaWrapper>
      <Spinner visible={isLoading} />

      {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} mx="5" pt="13">
            <Text variant="text2Xl" fontWeight={700}>
              Добро пожаловать!
            </Text>
            <ErrorList errors={errors} />
            <Input
              textHolder="Почта"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              textHolder="Пароль"
              password={true}
              onChangeText={(text) => setPassword(text)}
            />

            <Box mt="6.5" width="100%" mb="13">
              <Button onPress={onSubmit} label="Авторизация" />
            </Box>
            <Text variant="textLg" textAlign="center" fontWeight={500}>
              Нет аккаунта?{" "}
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
      </KeyboardAwareScrollView>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
