// NumericIndicators.js
import React from 'react';
import { Text, Metric, Card } from "@tremor/react";

const NumericIndicators = () => {
  return (
    <div className="h-full">
      <div className="h-1/2 pb-3">
        <Card className="h-full">
          <Text>Number of Clients</Text>
          <Metric>42</Metric>
        </Card>
      </div>
      <div className="h-1/2">
        <Card className="h-full">
          <Text>Sent by Email</Text>
          <Metric>12</Metric>
        </Card>
      </div>
    </div>
  );
};

export default NumericIndicators;
