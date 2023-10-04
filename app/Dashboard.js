// Import necessary components from Tremor
import {
  Card,
  Flex,
  Text,
  Metric,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@tremor/react";

const Dashboard = () => {
  return (
    <Card>
      {/* Numeric Indicators */}
      <Flex justifyContent="space-between">
        <div>
          <Text>Number of Clients</Text>
          <Metric>42</Metric>
        </div>
        <div>
          <Text>Sent by Email</Text>
          <Metric>25</Metric>
        </div>
      </Flex>

      {/* List of Top Studies */}
      <TabGroup>
        <TabList className="mt-4">
          <Tab>Study 1</Tab>
          <Tab>Study 2</Tab>
          <Tab>Study 3</Tab>
          <Tab>Study 4</Tab>
          <Tab>Study 5</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {/* Content for Study 1 */}
            <Text>Study 1 Details</Text>
            {/* Add more content as needed */}
          </TabPanel>
          <TabPanel>
            {/* Content for Study 2 */}
            <Text>Study 2 Details</Text>
          </TabPanel>
          {/* Add TabPanels for Study 3 to Study 5 */}
        </TabPanels>
      </TabGroup>

      {/* Table of Clinical Results */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2023-09-25</td>
            <td>Patient A</td>
            <td>Completed</td>
            <td>
              {/* Add actions buttons */}
              <button>Download</button>
              <button>Print</button>
              <button>View</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </Card>
  );
};

export default Dashboard;
