import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import { useAppDispatch, useAppSelector } from "components/general/Hooks";
import { geAllCategories } from "store/categoriesSlice";
import Loader from "components/general/Loader";
import { Button } from "react-native";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "Categories"
>;

const CategoriesScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  const { categories, loading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(geAllCategories());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Box>
        <Text variant="textBase">CategoriesScreen</Text>
        <Button
          title="geAllCategories"
          onPress={() => dispatch(geAllCategories())}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoriesScreen;
