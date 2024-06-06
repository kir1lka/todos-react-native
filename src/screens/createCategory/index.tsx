import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import theme, { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import NavigateBack from "components/general/NavigateBack";
import {
  Color_category,
  ICategory,
  ICategoryRequest,
  Icons,
} from "store/types";
import Button from "components/button/Button";
import Input from "components/input/Input";
import { useAppDispatch, useAppSelector } from "components/general/Hooks";
import { geAllColors } from "store/colorsSlice";
import { geAllIcons } from "store/iconsSlice";
import Loader from "components/general/Loader";
import { ErrorList } from "components/general/ErrorList";
import Spinner from "react-native-loading-spinner-overlay";
import { AddCategories, getAllCategories } from "store/categoriesSlice";

type ErrorState = {
  [key: string]: string[];
};

type CreateCategotyScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "CreateCategory"
>;

const CreateCategotyScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const { categories, error, loading } = useAppSelector(
    (state) => state.categories
  );
  const icons = useAppSelector((state) => state.icons);
  const colors = useAppSelector((state) => state.colors);
  const user = useAppSelector((state) => state.user.user);

  const navigation = useNavigation<CreateCategotyScreenNavigationProp>();

  const [errors, setErrors] = useState<ErrorState>();

  const [newCategory, setNewCategory] = useState<
    Omit<
      ICategory,
      "id" | "user" | "id_user" | "id_icon" | "id_color" | "isEditable"
    >
  >({
    name: "",
    color_category: null,
    icon: null,
  });

  useEffect(() => {
    dispatch(geAllColors());
    dispatch(geAllIcons());
  }, []);

  useEffect(() => {
    if (colors.colors.length > 0 && icons.icons.length > 0) {
      setNewCategory((prev) => ({
        ...prev,
        color_category: colors.colors[0],
        icon: icons.icons[0],
      }));
    }
  }, [colors.colors, icons.icons]);

  useEffect(() => {
    if (error && typeof error === "object") {
      setErrors(error);
    } else {
      setErrors({});
    }
  }, [error]);

  //functions
  const updateColor = (color: Color_category) => {
    setNewCategory((prev) => {
      return {
        ...prev,
        color_category: color,
      };
    });
  };

  const updateIcon = (icon: Icons) => {
    setNewCategory((prev) => {
      return {
        ...prev,
        icon: icon,
      };
    });
  };

  const SubmitaddCategory = async () => {
    if (user) {
      let category: ICategoryRequest = {
        name: newCategory.name,
        id_color: newCategory.color_category?.id || 0,
        id_icon: newCategory.icon?.id || 0,
        id_user: user.id,
        isEditable: true,
      };

      await dispatch(AddCategories(category)).unwrap();
      dispatch(getAllCategories());
      navigation.navigate("Categories");
    }
  };

  if (icons.loading && colors.loading) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Spinner visible={loading} />

      <Box flex={1} mx="4">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt="4"
        >
          <NavigateBack />
        </Box>
        <Box borderRadius="rounded-2xl" mb="6">
          <Input
            textHolder="Придумайте категорию ..."
            onChangeText={(text) => {
              setNewCategory((prev) => {
                return { ...prev, name: text };
              });
            }}
          />
        </Box>

        <Box bg="gray250" p="4" borderRadius="rounded-2xl" mb="6">
          <Box
            bg="white"
            width={64}
            p="2"
            borderRadius="rounded-2xl"
            alignItems="center"
            mb="3"
          >
            <Text
              variant="textBase"
              fontWeight={500}
              color={newCategory.color_category?.name as any}
              textDecorationLine="underline"
            >
              Цвет
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-evenly">
            {colors.colors.map((color, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  onPress={() => updateColor(color)}
                >
                  <Box
                    style={{ backgroundColor: color.code }}
                    width={26}
                    height={26}
                    borderRadius="rounded-2xl"
                    borderWidth={2}
                    borderColor={
                      newCategory.color_category?.id === color.id
                        ? "gray900"
                        : "transparent"
                    }
                  ></Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </Box>

        <Box bg="gray250" p="4" borderRadius="rounded-2xl" mb="4">
          <Box
            bg="white"
            width={64}
            p="2"
            borderRadius="rounded-2xl"
            alignItems="center"
            mb="3"
          >
            <Text variant="textBase" fontWeight={500}>
              {newCategory.icon?.symbol}
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-evenly">
            {icons.icons.map((icon, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  onPress={() => updateIcon(icon)}
                >
                  <Box
                    width={30}
                    height={30}
                    borderRadius="rounded-2xl"
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={2}
                    borderColor={
                      newCategory.icon?.id === icon.id
                        ? "primary"
                        : "transparent"
                    }
                  >
                    <Text variant="textBase">{icon.symbol}</Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </Box>

        {errors && Object.keys(errors).length > 0 && (
          <ErrorList errors={errors} />
        )}

        <Box flex={1} justifyContent="flex-end" mb="4">
          <Button label="Создать категорию" onPress={SubmitaddCategory} />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategotyScreen;
