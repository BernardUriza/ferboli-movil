"use client"
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Users from './Users';
import Results from './Results';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@tremor/react";
import { HomeIcon, UserIcon, SearchIcon } from '@heroicons/react/outline';

const Page = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <TabGroup>
        <TabList className="tabs">
          <Tab onClick={() => handleTabChange('dashboard')}>
            <HomeIcon className="w-6 h-6" /> Dashboard
          </Tab>
          <Tab onClick={() => handleTabChange('users')}>
            <UserIcon className="w-6 h-6" /> Users
          </Tab>
          <Tab onClick={() => handleTabChange('results')}>
            <SearchIcon className="w-6 h-6" /> Results
          </Tab>
        </TabList>
        <TabPanels className="content">
          <TabPanel when="dashboard">
            <Dashboard />
          </TabPanel>
          <TabPanel when="users">
            <Users />
          </TabPanel>
          <TabPanel when="results">
            <Results />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Page;
