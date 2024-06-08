import React from "react";
import { Box, Text } from "utils/theme";

const TaskSkeleton: React.FC = () => (
  <Box p="4" backgroundColor="gray250" borderRadius="rounded-2xl" mb="3.5">
    <Box flexDirection="row">
      <Text variant="textLg" fontWeight={500} mr="2" color="gray250">
        123
      </Text>
    </Box>
  </Box>
);

export default TaskSkeleton;
