import React from 'react';
import { Card, Title, BarList } from "@tremor/react";

const TopStudiesList = ({ medicalReports }) => {
  // Create a mapping of category IDs to names
  const categoryMap = {};

  // Group studies by categories and count the number of reports per category
  const categoryCounts = medicalReports.reduce((categoryCount, report) => {
    // Iterate through studies within each medical report
    report.studies.forEach((study) => {
      const { category } = study;
      const categoryName = category.name;
      categoryMap[category.id] = categoryName;
      categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
    });
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
