import Icons from "components/general/icons";
import React, { Ref, useRef, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import theme, { Box, Text } from "utils/theme";

type InputProps = {
  textHolder: string;
  value?: string;
  // inputRef: Ref<TextInput>;
  onSubmitEditing?: () => void;
  onChangeText?: (text: string) => void;
  keyboardType?: keyboardTypeProps;
  password?: boolean;
  error?: boolean;
};

type keyboardTypeProps = "default" | "email-address" | "numeric";

const Input: React.FC<InputProps> = ({
  textHolder,
  onSubmitEditing,
  onChangeText,
  // inputRef,
  value = "",
  keyboardType = "default",
  error = false,
  password = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box>
      <TextInput
        style={{
          marginTop: theme.spacing[6.5],
          borderColor: isFocused
            ? theme.colors.primary
            : !isFocused && error
            ? theme.colors.red500
            : theme.colors.gray300,
          width: "100%",
          fontSize: 18,
          borderWidth: 2,
          borderRadius: theme.borderRadii["rounded-2xl"],
          padding: theme.spacing[3.5],
        }}
        value={value}
        keyboardType={keyboardType}
        placeholder={textHolder}
        clearButtonMode="always"
        secureTextEntry={password}
        returnKeyType="done"
        onChangeText={(text) => onChangeText?.(text)}
        // ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmitEditing}
      />
    </Box>
  );
};

export default Input;
