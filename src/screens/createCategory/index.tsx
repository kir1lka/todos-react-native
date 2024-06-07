import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
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
import {
  AddCategories,
  DeleteCategory,
  EditCategory,
  getAllCategories,
} from "store/categoriesSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ErrorState = {
  [key: string]: string[];
};

type CreateCategotyScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "CreateCategory"
>;

type CreateCategoryRouteTypes = RouteProp<
  CategoriesStackParamList,
  "CreateCategory"
>;

const CreateCategotyScreen: React.FC = () => {
  const route = useRoute<CreateCategoryRouteTypes>();
  const dispatch = useAppDispatch();

  const { categories, error } = useAppSelector((state) => state.categories);
  const icons = useAppSelector((state) => state.icons);
  const colors = useAppSelector((state) => state.colors);
  const user = useAppSelector((state) => state.user.user);

  const navigation = useNavigation<CreateCategotyScreenNavigationProp>();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorState>();

  const [newCategory, setNewCategory] = useState<
    Omit<
      ICategory,
      "id" | "user" | "id_user" | "id_icon" | "id_color" | "isEditable"
    >
  >({
    name: route.params.category?.name ?? "",
    color_category: route.params.category?.color_category ?? null,
    icon: route.params.category?.icon ?? null,
  });

  useEffect(() => {
    dispatch(geAllColors());
    dispatch(geAllIcons());
  }, []);

  useEffect(() => {
    if (
      !route.params.category &&
      colors.colors.length > 0 &&
      icons.icons.length > 0
    ) {
      setNewCategory((prev) => ({
        ...prev,
        color_category: colors.colors[0],
        icon: icons.icons[0],
      }));
      setErrors({});
    }
    setErrors({});
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

  const SubmitAddEditCategory = async () => {
    setLoading(true);

    try {
      if (user) {
        let category: ICategoryRequest = {
          id: route.params.category?.id || 0,
          name: newCategory.name,
          id_color: newCategory.color_category?.id || 0,
          id_icon: newCategory.icon?.id || 0,
          id_user: user.id,
          isEditable: true,
        };

        if (route.params.category) {
          await dispatch(EditCategory(category)).unwrap();
          dispatch(getAllCategories());
          navigation.navigate("Categories");
        } else {
          await dispatch(AddCategories(category)).unwrap();
          dispatch(getAllCategories());
          navigation.navigate("Categories");
        }
      }
    } catch {
      setLoading(false);
    }

    setLoading(false);
  };

  const SubmitDeleteCategory = async () => {
    setLoading(true);
    try {
      if (user) {
        let category: ICategoryRequest = {
          id: route.params.category?.id || 0,
          name: newCategory.name,
          id_color: newCategory.color_category?.id || 0,
          id_icon: newCategory.icon?.id || 0,
          id_user: user.id,
          isEditable: true,
        };

        await dispatch(DeleteCategory(category)).unwrap();
        dispatch(getAllCategories());
        navigation.navigate("Categories");
      }
    } catch {
      setLoading(false);
    }

    setLoading(false);
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

          {route.params.category && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={SubmitDeleteCategory}
            >
              <Box bg="rose500" borderRadius="rounded-2xl" p="2">
                <MaterialCommunityIcons
                  name="delete"
                  color={theme.colors.white}
                  size={24}
                />
              </Box>
            </TouchableOpacity>
          )}
        </Box>

        <Box borderRadius="rounded-2xl" mb="6">
          <Input
            value={newCategory.name}
            textHolder="Название категории"
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
          <Button
            label={
              route.params.category
                ? "Сохранить категорию"
                : "Создать категорию"
            }
            onPress={SubmitAddEditCategory}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategotyScreen;
