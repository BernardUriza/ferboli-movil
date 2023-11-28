// NumericIndicators.js
import React from 'react';
import { Text, Metric, Card } from "@tremor/react";
import { UserGroupIcon } from '@heroicons/react/outline';

const NumericIndicators = () => {
  return (
    <div className="h-full">
      <div className="h-1/2 pb-3">
        <Card className="h-full">
          <div className='flex'>
            <div>
              <Text>Pacientes</Text>
              <Metric>200</Metric>
            </div>
            <UserGroupIcon style={{width: "36px",height: "36px"}}></UserGroupIcon>
          </div>
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
