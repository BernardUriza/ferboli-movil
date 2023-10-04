// TopStudiesList.js
import React from 'react';
import { TabGroup, TabList, Tab, TabPanels, TabPanel, Text } from "@tremor/react";

const TopStudiesList = ({ studiesData }) => {
  return (
    <TabGroup>
      <TabList className="mt-4">
        {studiesData.map((study) => (
          <Tab key={study.id}>{study.name}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {studiesData.map((study) => (
          <TabPanel key={study.id}>
            {/* Content for Study */}
            <Text>{study.name} Details</Text>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default TopStudiesList;
