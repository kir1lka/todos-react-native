import React from "react";
import { ICategory } from "store/types";
import { Box, Text } from "utils/theme";

type CategoryProps = {
  item: ICategory;
};

const Category: React.FC<CategoryProps> = ({ item }) => (
  <Box p="4" backgroundColor="gray250" borderRadius="rounded-2xl" mb="3.5">
    <Box flexDirection="row">
      <Text variant="textLg" fontWeight={500} mr="2">
        {item.icon.symbol}
      </Text>
      <Text variant="textLg" fontWeight={500}>
        {item.name}
      </Text>
    </Box>
  </Box>
);

export default Category;
