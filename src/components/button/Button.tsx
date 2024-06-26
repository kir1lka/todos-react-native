import { Pressable, TouchableOpacity } from "react-native";
import theme, { Box, Text } from "utils/theme";
import { Feather } from "@expo/vector-icons";

type TextAligin =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

type ButtonProps = {
  label: string;
  onPress: () => void;
  textAlign?: TextAligin;
  onLongPress?: () => void;
  disabled?: boolean;
  iconName?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  onLongPress,
  disabled,
  iconName = "",
  textAlign = "center",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={0.6}
    >
      <Box
        bg={disabled ? "gray800" : "primary"}
        py="3.5"
        borderRadius="rounded-2xl"
        flexDirection="row"
        justifyContent={textAlign}
        px="4"
      >
        <Text
          variant="textBase"
          color="white"
          fontWeight={700}
          ml={iconName !== "" ? "2" : "0"}
        >
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
