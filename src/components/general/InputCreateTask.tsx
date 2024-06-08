import Icons from "components/general/icons";
import { format, isToday } from "date-fns";
import React, { Ref, useEffect, useRef, useState } from "react";
import { FlatList, TextInput, TouchableOpacity } from "react-native";
import { ICategory, ITaskRequest } from "store/types";
import theme, { Box, Text } from "utils/theme";
import { useAppDispatch, useAppSelector } from "./Hooks";
import Loader from "./Loader";
import { getAllCategories } from "store/categoriesSlice";
import Category from "components/categories/Category";

import { Calendar, LocaleConfig } from "react-native-calendars";
import { ru } from "date-fns/locale";
import { AddTask, getShowTasksForCategory } from "store/tasksSlice";

LocaleConfig.locales["ru"] = {
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  dayNames: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  today: "Сегодня",
};
LocaleConfig.defaultLocale = "ru";

type InputProps = {
  textHolder: string;
  categotyId: number;
  userId: number;
};

const InputCreateTask: React.FC<InputProps> = ({
  textHolder,
  categotyId,
  userId,
}) => {
  const dispatch = useAppDispatch();

  const { categories, loading } = useAppSelector((state) => state.categories);

  const [isFocused, setIsFocused] = useState(false);
  // const [currentCategories, setCurrentCategories] = useState<
  //   Omit<ICategory, "id" | "id_color" | "id_icon" | "id_user" | "isEditable">
  // >({
  //   name: "",
  //   color_category: null,
  //   icon: null,
  // });

  const [isSelectCategory, setIsSelectCategory] = useState<boolean>(false);
  const [isSelectCalendar, setIsSelectCalendar] = useState<boolean>(false);

  const [newTask, setNewTask] = useState<ITaskRequest>({
    name: "",
    id_category: categotyId,
    isCompleted: false,
    id_user: userId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  // console.log(newTask);
  const today = new Date();
  const selectedDate = format(new Date(newTask.created_at), "yyyy-MM-dd");

  const selectedCategory = categories?.find(
    (category) => category.id === newTask.id_category
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const createTask = async () => {
    console.log(newTask);
    await dispatch(AddTask(newTask)).unwrap();
    dispatch(getShowTasksForCategory(categotyId));
    setNewTask({
      name: "",
      id_category: categotyId,
      isCompleted: false,
      id_user: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  };

  // useEffect(() => {
  //   if (categories.length > 0 && categories.length > 0) {
  //     setCurrentCategories((prev) => ({
  //       ...prev,
  //       color_category: categories[0].color_category,
  //       icon: categories[0].icon,
  //     }));
  //     // setErrors({});
  //   }
  //   // setErrors({});
  // }, [categories]);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
      <Box
        style={{
          backgroundColor: theme.colors.gray300,
          borderRadius: theme.borderRadii["rounded-2xl"],
        }}
        mb="4"
      >
        <Box flexDirection="row" gap="1">
          <Box flex={3}>
            <TextInput
              style={{
                borderColor: isFocused
                  ? theme.colors.primary
                  : theme.colors.gray300,
                backgroundColor: theme.colors.white,
                width: "100%",
                fontSize: 18,
                borderWidth: 2,
                borderRadius: theme.borderRadii["rounded-2xl"],
                padding: theme.spacing[3.5],
              }}
              placeholder={textHolder}
              clearButtonMode="always"
              returnKeyType="done"
              value={newTask.name}
              onChangeText={(text) =>
                setNewTask((prev) => {
                  return {
                    ...prev,
                    name: text,
                  };
                })
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </Box>
          {/* <TouchableOpacity
            onPress={createTask}
            activeOpacity={0.7}
            style={{
              backgroundColor: theme.colors.primary,
              alignItems: "center",
              alignSelf: "center",
              flex: 1,
              padding: 12,
              borderRadius: theme.borderRadii["rounded-2xl"],
              marginRight: 2,
            }}
          >
            <Text variant="textBase" color="white" fontWeight={500}>
              Создать
            </Text>
          </TouchableOpacity> */}
        </Box>
        <Box
          p="2"
          borderRadius="rounded-2xl"
          flexDirection="row"
          gap="2"
          position="relative"
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ flex: 1 }}
            onPress={() => {
              setIsSelectCalendar((prev) => !prev);
              setIsSelectCategory(false);
            }}
          >
            <Box
              bg="white"
              borderRadius="rounded-2xl"
              flexDirection="row"
              alignItems="center"
              borderWidth={2}
              p="2"
              style={{
                borderColor: isSelectCalendar
                  ? theme.colors.primary
                  : theme.colors.gray400,
              }}
            >
              <Text variant="textBase" fontWeight={500}>
                📅
              </Text>
              <Text variant="textBase" pl="1" fontWeight={500}>
                {isToday(new Date(newTask.created_at))
                  ? "Сегодня"
                  : format(new Date(newTask.created_at), "d MMMM", {
                      locale: ru,
                    })}
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{ flex: 1 }}
            onPress={() => {
              setIsSelectCategory((prev) => !prev);
              setIsSelectCalendar(false);
            }}
          >
            <Box
              bg="white"
              borderRadius="rounded-2xl"
              flexDirection="row"
              alignItems="center"
              borderWidth={2}
              p="2"
              style={{
                borderColor: isSelectCategory
                  ? theme.colors.primary
                  : theme.colors.gray400,
              }}
            >
              <Text variant="textBase">{selectedCategory?.icon?.symbol}</Text>
              <Text
                variant="textBase"
                pl="1"
                fontWeight={500}
                style={{ color: selectedCategory?.color_category?.code }}
              >
                {selectedCategory?.name}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>

      {isSelectCalendar && (
        <Box borderRadius="rounded-2xl" mb="2">
          <Calendar
            style={{
              borderRadius: theme.borderRadii["rounded-2xl"],
            }}
            theme={{
              textSectionTitleColor: theme.colors.primary,

              monthTextColor: theme.colors.primary,
              textMonthFontWeight: "bold",

              todayTextColor: theme.colors.primary,
              selectedDayBackgroundColor: theme.colors.primary,
              selectedDayTextColor: theme.colors.primary,

              dayTextColor: theme.colors.primary,
              indicatorColor: theme.colors.primary,
              textInactiveColor: theme.colors.primary,
              textDayHeaderFontWeight: 500,
              textDayFontWeight: 500,
              textDayStyle: {
                color: "#000",
              },
              calendarBackground: theme.colors.gray300,
              textDisabledColor: "#9e9e9e",
              arrowColor: theme.colors.primary,
              agendaDayTextColor: theme.colors.primary,
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: theme.colors.primary,
                selectedTextColor: theme.colors.white,
              },
            }}
            minDate={format(today, "y-MM-dd")}
            onDayPress={(day) => {
              setIsSelectCalendar((prev) => !prev);
              setNewTask((prev) => {
                return {
                  ...prev,
                  created_at: format(new Date(day.dateString), "yyyy-MM-dd", {
                    locale: ru,
                  }),
                };
              });
            }}
          />
        </Box>
      )}

      {isSelectCategory && (
        <Box bg="gray300" p="2" borderRadius="rounded-2xl" mb="2">
          <Box mb="3" mt="1">
            <Text variant="textXl" fontWeight={700}>
              Выберите категорию
            </Text>
          </Box>

          <FlatList
            data={categories}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setNewTask((prev) => {
                      return {
                        ...prev,
                        id_category: item.id,
                      };
                    });
                    setIsSelectCategory((prev) => !prev);
                  }}
                >
                  <Box
                    p="3"
                    backgroundColor="gray250"
                    borderRadius="rounded-2xl"
                    borderWidth={2}
                    mb="3.5"
                    style={{
                      borderColor:
                        selectedCategory?.id === item.id
                          ? theme.colors.primary
                          : theme.colors.gray250,
                    }}
                  >
                    <Box
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box flexDirection="row">
                        <Text variant="textLg" fontWeight={500} mr="2">
                          {item.icon?.symbol}
                        </Text>
                        <Text
                          variant="textLg"
                          fontWeight={500}
                          style={{ color: item.color_category?.code }}
                        >
                          {item.name}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      )}
    </>
  );
};

export default InputCreateTask;
