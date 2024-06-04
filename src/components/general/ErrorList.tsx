import React from "react";
import { Box, Text } from "utils/theme";

type ErrorState = {
  [key: string]: string[];
};

type ErrorListProps = {
  errors: ErrorState;
};

export const ErrorList: React.FC<ErrorListProps> = ({ errors }) => {
  return (
    <>
      {Object.keys(errors).length > 0 && (
        <Box
          px="4"
          bg="red500"
          borderColor="red600"
          borderRadius="rounded-2xl"
          mt="4"
          p="2"
        >
          {Object.keys(errors).map((key) => (
            <Text key={key} color="white" variant="textBase">
              {errors[key][0]}
            </Text>
          ))}
        </Box>
      )}
    </>
  );
};
