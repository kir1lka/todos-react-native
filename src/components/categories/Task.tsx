import React from "react";
import { ICategory, ITask } from "store/types";
import theme, { Box, Text } from "utils/theme";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "navigation/types";
import { useNavigation } from "@react-navigation/native";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "Category"
>;

type TaskProps = {
  item: ITask;
};

const Task: React.FC<TaskProps> = ({ item }) => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  //   const navigateCategoryScreen = () => {
  //     navigation.navigate("Category", {
  //       id: item.id,
  //     });
  //   };

  //   const navigateCreateCategory = () => {
  //     navigation.navigate("CreateCategory", {
  //       category: item,
  //     });
  //   };
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Box p="4" backgroundColor="gray250" borderRadius="rounded-2xl" mb="3.5">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flexDirection="row">
            <Text variant="textLg" fontWeight={500} mr="2">
              {/* {item.icon?.symbol} */}
            </Text>
            <Text variant="textLg" fontWeight={500}>
              {item.name}
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Task;
