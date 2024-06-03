import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import Navigation from "navigation";
import theme from "utils/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar />
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
