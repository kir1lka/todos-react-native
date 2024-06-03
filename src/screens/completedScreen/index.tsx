import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import React from "react";
import { Box, Text } from "utils/theme";

const CompletedScreen: React.FC = () => {
  return (
    <SafeAreaWrapper>
      <Box>
        <Text variant="textBase">CompletedScreen</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CompletedScreen;
