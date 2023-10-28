import React from 'react';
import { Card, Title, BarList, Bold, Flex, Text } from "@tremor/react";

const TopStudiesList = ({ studiesData, categories }) => {
  // Create a mapping of category IDs to names
  const categoryMap = categories.reduce((map, category) => {
    map[category.id] = category.name;
    return map;
  }, {});

  // Group studies by categories and count the number of reports per category
  const categoryCounts = studiesData.reduce((categoryCount, study) => {
    const { category } = study;
    const categoryName = categoryMap[category.id];
    categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
    return categoryCount;
  }, {});

  // Sort categories by the number of reports (descending order)
  const sortedCategories = Object.entries(categoryCounts).sort(
    (a, b) => b[1] - a[1]
  );

  // Select the top five categories
  const topCategories = sortedCategories.slice(0, 5);

  return (
    <Card className="">
      <Title style={{ fontSize: "14px", fontWeight: 400, lineHeight: "20px", letterSpacing: "0em", textAlign: "left" }}>
        Top 5 de categorías
      </Title>
      <BarList
        data={topCategories.map(([category, count]) => ({
          value: count,
          name: category,
        }))}
        valueFormatter={(value) => `${value} reportes`}
      />
    </Card>
  );
};

export default TopStudiesList;
