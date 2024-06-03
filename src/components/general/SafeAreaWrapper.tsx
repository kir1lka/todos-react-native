import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "utils/theme";

type SafeAreaWrapperProps = {
  children: ReactNode;
};

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
