// NumericIndicators.js
import React from 'react';
import { Text, Metric } from "@tremor/react";

const NumericIndicators = () => {
  return (
    <div className="flex justify-between mb-4">
      <div>
        <Text>Number of Clients</Text>
        <Metric>42</Metric>
      </div>
      <div>
        <Text>Sent by Email</Text>
        <Metric>25</Metric>
      </div>
    </div>
  );
};

export default NumericIndicators;
