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
import { useAppDispatch } from "components/general/Hooks";
import axiosManager from "axios/AxiosClient";
import { addAccessToken } from "store/authSlice";
import { setUser } from "store/userSlice";
import Spinner from "react-native-loading-spinner-overlay";
import { ErrorList } from "components/general/ErrorList";

type SignupScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Signup"
>;

type ErrorState = {
  [key: string]: string[];
};

type Payload = {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
};

const SignupScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});

  const navigation = useNavigation<SignupScreenNavigationProp>();

  const navigateToSignup = () => {
    navigation.navigate("Login");
  };

  //functions
  const onSubmit = () => {
    setIsLoading(true);

    const payload: Payload = {
      name: name,
      email: email,
      password: password,
    };

    axiosManager
      .post("/signup", payload)
      .then((res) => {
        dispatch(setUser(res.data.user));
        dispatch(addAccessToken(res.data.token));
        setIsLoading(false);
      })
      .catch((err) => {
        const res = err.response;
        if (res && res.status === 422) {
          setErrors(err.response.data.errors);
          console.log(err.response.data.errors);
        }
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaWrapper>
      <Spinner visible={isLoading} />

      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1} mx="5" justifyContent="center">
            <Text variant="text2Xl" fontWeight={700}>
              Добро пожаловать!
            </Text>
            <Text variant="text2Xl" fontWeight={700}>
              Здесь все начинается
            </Text>

            <ErrorList errors={errors} />
            <Input textHolder="Имя" onChangeText={(text) => setName(text)} />
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

            <Box mt="6.5" width="100%" alignSelf="center" mb="13">
              <Button onPress={onSubmit} label="Регистрация" />
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
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;
