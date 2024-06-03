import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import theme, { Box, Text } from "utils/theme";
import { AuthStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import { LinearGradient } from "expo-linear-gradient";
import Button from "components/button/Button";
import { Image } from "react-native";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Welcome"
>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const navigateToSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaWrapper>
      <LinearGradient
        colors={[
          "#fff",
          "#fef8ff",
          "#fcecff",
          "#fae2ff",
          "#fcecff",
          "#fef8ff",
          "#fff",
        ]}
        style={{ flex: 1 }}
      >
        <Box flex={1} justifyContent="center">
          <Box alignSelf="center" mb="3.5">
            <Image
              source={require("./../../../assets/Blossom.png")}
              width={120}
              height={120}
            />
          </Box>

          <Box width={270} alignContent="center" alignSelf="center">
            <Text
              variant="textXl"
              lineHeight={25}
              textAlign="center"
              fontWeight={700}
            >
              Хочешь больше продуктивности в жизни?
            </Text>
          </Box>
          <Box my="3" width={250} alignSelf="center">
            <Button onPress={navigateToSignup} label="Начнем!" />
          </Box>
          <Text
            variant="textSm"
            lineHeight={25}
            textAlign="center"
            fontWeight={500}
            color="gray500"
          >
            Сегодня чудесный день для этого!
          </Text>
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;
