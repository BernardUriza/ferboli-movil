import React from 'react';
import { Card, Title, BarList, Bold, Flex, Text } from "@tremor/react";

const TopStudiesList = ({ studiesData }) => {
  return (
    <Card className="">
      <Title style={{  fontSize: "14px", fontWeight: 400, lineHeight: "20px", letterSpacing: "0em", textAlign: "left", }}>Top 5 de estudios</Title>
      <BarList
        data={studiesData.map((study) => ({
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
