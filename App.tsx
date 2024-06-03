import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import Navigation from "navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import theme from "utils/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar />
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
