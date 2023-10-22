import React from 'react';
import { Card, Title, BarList, Bold, Flex, Text } from "@tremor/react";

const TopStudiesList = ({ studiesData }) => {
  const topStudies = studiesData.slice(0, 5);
  return (
    <Card className="">
      <Title style={{  fontSize: "14px", fontWeight: 400, lineHeight: "20px", letterSpacing: "0em", textAlign: "left", }}>Top 5 de estudios</Title>
      <BarList
        data={topStudies.map((study) => ({
          value: study.percent,
          name: study.name,
        }))}
        color="emerald"
        valueFormatter={(value) => `${value}%`}
      />
    </Card>
  );
};

export default TopStudiesList;
