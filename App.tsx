import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View } from "react-native";
import theme, { Box, Text } from "utils/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar style="dark" />
        <Text variant="text3Xl">Hello world!</Text>
      </View>
    </ThemeProvider>
  );
};

export default App;
