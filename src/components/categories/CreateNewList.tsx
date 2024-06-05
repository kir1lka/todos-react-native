import theme, { Box, Text } from "utils/theme";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { CategoriesStackParamList } from "navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "Categories"
>;

const CreateNewList = () => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  const navigateToCreateCategory = () => {
    navigation.navigate("CreateCategory", {});
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={navigateToCreateCategory}>
      <Box
        p="4"
        backgroundColor="primary"
        borderRadius="rounded-2xl"
        flexDirection="row"
        alignItems="center"
      >
        <Feather name="plus" size={24} color={theme.colors.white} />
        <Text variant="textLg" fontWeight={600} color="white" ml="1">
          {" "}
          Создать категорию
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default CreateNewList;
