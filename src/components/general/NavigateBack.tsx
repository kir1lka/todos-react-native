import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import theme, { Box } from "utils/theme";
import { Ionicons } from "@expo/vector-icons";

const NavigateBack: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Box bg="primary" borderRadius="rounded-2xl" p="2">
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </Box>
    </TouchableOpacity>
  );
};

export default NavigateBack;
