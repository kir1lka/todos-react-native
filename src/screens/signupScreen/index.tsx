import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Text } from "utils/theme";
import { AuthStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";

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
      <Box>
        <Text variant="textBase">SignupScreen</Text>
        <Button title="to login" onPress={navigateToSignup} />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;
