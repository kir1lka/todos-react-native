import { Color_category, Icons } from "store/types";

const palette = {
  red500: "#ef4444",
  red600: "#dc2626",
  orange300: "#fdba74",
  orange400: "#fb923c",
  green500: "#22c55e",
  green600: "#16a34a",
  sky400: "#38bdf8",
  sky500: "#0ea5e9",
  purple500: "#a855f7",
  purple600: "#9333ea",
};

export const getColors = () => {
  const colors: Color_category[] = Object.keys(palette).map((_paletteItem) => {
    return {
      id: Date.now(),
      code: palette[_paletteItem as keyof typeof palette],
      name: _paletteItem,
    };
  });

  return colors;
};

const ICON_SET = {
  seed: "🌱",
  fries: "🍟",
  pizza: "🍕",
  rocket: "🚀",
  grinning: "😀",
  partying_face: "🥳",
  beach_umbrella: "🏖️",
};

export const getIcons = () => {
  const icons: Icons[] = Object.keys(ICON_SET).map((_icon) => {
    return {
      id: Date.now(),
      name: _icon,
      symbol: ICON_SET[_icon as keyof typeof ICON_SET],
      code: _icon, // <-- Добавьте это свойство
    };
  });
  return icons;
};

export const getGreeting = ({ hour }: { hour: number }) => {
  if (hour < 12) {
    return "morning";
  }
  if (hour < 18) {
    return "evening";
  } else {
    return "night";
  }
};
