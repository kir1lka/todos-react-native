import { Box } from "utils/theme";
import SafeAreaWrapper from "./SafeAreaWrapper";
import { ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <SafeAreaWrapper>
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size="large" />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Loader;
