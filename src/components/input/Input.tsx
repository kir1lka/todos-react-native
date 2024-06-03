import React, { useRef, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import theme, { Box, Text } from "utils/theme";

type InputProps = {
  textHolder: string;
  onSubmitEditing?: () => void;
  keyboardType?: keyboardTypeProps;
  error?: undefined;
};

type keyboardTypeProps =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "ascii-capable"
  | "numbers-and-punctuation"
  | "url"
  | "number-pad"
  | "name-phone-pad"
  | "decimal-pad";

const Input: React.FC<InputProps> = ({
  textHolder,
  onSubmitEditing,
  keyboardType = "default",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <Box>
      <TextInput
        style={{
          marginTop: theme.spacing[6.5],
          borderColor: isFocused ? theme.colors.primary : theme.colors.gray300,
          width: "100%",
          fontSize: 18,
          borderWidth: 2,
          borderRadius: theme.borderRadii["rounded-2xl"],
          padding: theme.spacing[3.5],
        }}
        keyboardType={keyboardType}
        placeholder={textHolder}
        returnKeyType="next"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmitEditing}
      />
    </Box>
  );
};

export default Input;
