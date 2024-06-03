import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Text } from "utils/theme";
import { AuthStackParamList } from "navigation/types";

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
    <Box>
      <Text variant="textBase">LoginScreen</Text>
      <Button title="to signup" onPress={navigateToSignup} />
    </Box>
  );
};

export default LoginScreen;
