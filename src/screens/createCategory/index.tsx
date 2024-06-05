import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import theme, { Box, Text } from "utils/theme";
import { CategoriesStackParamList } from "navigation/types";
import SafeAreaWrapper from "components/general/SafeAreaWrapper";
import NavigateBack from "components/general/NavigateBack";
import { Color_category, ICategory, Icons } from "store/types";
import Button from "components/button/Button";
import { getColors, getIcons } from "helpers/helper";
import Input from "components/input/Input";

const COLORS = getColors();
const ICONS = getIcons();

const DEFAULT_COLOR = COLORS[0];
const DEFAULT_ICONS = ICONS[0];

type CreateCategotyScreenNavigationProp = NativeStackNavigationProp<
  CategoriesStackParamList,
  "CreateCategory"
>;

const CreateCategotyScreen: React.FC = () => {
  const navigation = useNavigation<CreateCategotyScreenNavigationProp>();

  const [newCategory, setNewCategory] = useState<
    Omit<ICategory, "id" | "id_user" | "user" | "isEditable">
  >({
    name: "",
    id_color: DEFAULT_COLOR.id,
    id_icon: DEFAULT_ICONS.id,
    color_category: DEFAULT_COLOR,
    icon: DEFAULT_ICONS,
  });

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

  return (
    <SafeAreaWrapper>
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
              color={newCategory.color_category.name as any}
            >
              Цвета
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-evenly">
            {COLORS.map((color, index) => {
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
                      newCategory.color_category === color
                        ? "gray900"
                        : "transparent"
                    }
                  ></Box>
                </TouchableOpacity>
              );
            })}
          </Box>
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
            <Text variant="textBase" fontWeight={500}>
              {newCategory.icon.symbol}
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-evenly">
            {ICONS.map((icon, index) => {
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
                      newCategory.icon === icon ? "primary" : "transparent"
                    }
                  >
                    <Text variant="textBase">{icon.symbol}</Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </Box>

        <Box flex={1} justifyContent="flex-end" mb="4">
          <Button
            label="Создать категорию"
            onPress={() => console.log(newCategory)}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategotyScreen;
