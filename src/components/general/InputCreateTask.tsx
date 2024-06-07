import Icons from "components/general/icons";
import React, { Ref, useRef, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { ITaskRequest } from "store/types";
import theme, { Box, Text } from "utils/theme";

type InputProps = {
  textHolder: string;
  categotyId: number;
  userId: number;
};

const InputCreateTask: React.FC<InputProps> = ({
  textHolder,
  categotyId,
  userId,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [newTask, setNewTask] = useState<ITaskRequest>({
    name: "",
    id_category: categotyId,
    isCompleted: false,
    id_user: userId,
    created_at: Date.now(),
    updated_at: Date.now(),
  });

  console.log(newTask);

  return (
    <Box>
      <TextInput
        style={{
          borderColor: isFocused ? theme.colors.primary : theme.colors.gray300,
          width: "100%",
          fontSize: 18,
          borderWidth: 2,
          borderRadius: theme.borderRadii["rounded-2xl"],
          padding: theme.spacing[3.5],
        }}
        placeholder={textHolder}
        clearButtonMode="always"
        returnKeyType="done"
        value={newTask.name}
        onChangeText={(text) =>
          setNewTask((prev) => {
            return {
              ...prev,
              name: text,
            };
          })
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Box>
  );
};

export default InputCreateTask;
