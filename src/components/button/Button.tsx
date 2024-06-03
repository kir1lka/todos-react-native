import { Pressable, TouchableOpacity } from "react-native";
import { Box, Text } from "utils/theme";

type ButtonProps = {
  label: string;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  onLongPress,
  disabled,
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
      >
        <Text
          variant="textBase"
          color="white"
          fontWeight={700}
          textAlign="center"
        >
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
