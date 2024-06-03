import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import React from "react";
import { Box, Text } from "utils/theme";

const TodayScreen: React.FC = () => {
  return (
    <SafeAreaWrapper>
      <Box>
        <Text variant="textBase">TodayScreen</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default TodayScreen;
