import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";

type CreateCategotyScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "CreateCategory"
>;

const CreateCategotyScreen: React.FC = () => {
  const navigation = useNavigation<CreateCategotyScreenNavigationProp>();

  //   const navigateToHome = () => {
  //     navigation.navigate("Home");
  //   };

  return (
    <SafeAreaWrapper>
      <Box>
        <Text variant="textBase">CreateCategotyScreen</Text>
        {/* <Button title="to home" onPress={navigateToHome} /> */}
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategotyScreen;
