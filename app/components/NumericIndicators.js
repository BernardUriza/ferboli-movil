// NumericIndicators.js
import React from 'react';
import { Text, Metric, Card } from "@tremor/react";

const NumericIndicators = () => {
  return (
    <div className="flex-column w-1/4">
      <Card className="max-w-xs my-3">
        <Text>Number of Clients</Text>
        <Metric>42</Metric>
      </Card>
      <Card className="max-w-xs my-3">
        <Text>Sent by Email</Text>
        <Metric>25</Metric>
      </Card>
    </div>
  );
};

export default NumericIndicators;
