"use client"
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Users from './Users';
import Results from './Results';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@tremor/react";
import { HomeIcon, UserIcon, SearchIcon } from '@heroicons/react/outline';
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

const Page = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='container mx-auto my-5 font-sans'>

      <div className="flex items-center my-5 space-x-4">
        <div class="w-28">
          <img src="/images/ferboliMovil.png" alt="Logo Image" className="mx-auto my-auto" />
        </div>
        <div class="flex-1">
          <div class="text-gray-700 text-xl font-normal leading-7">Bienvenido, Dr. Ernesto Fernandez</div>
          <div class="text-gray-500 text-base font-normal leading-5">Panel de administración</div>
        </div>
        <div className="w-28">
          <button class="text-gray-500 hover:text-blue-700 flex items-center focus:outline-none">
            Salir
            <HiOutlineArrowRightOnRectangle className="mx-1 w-6 h-6" />
          </button>
        </div>
      </div>


      <TabGroup>
        <TabList className="tabs">
          <Tab className="flex" onClick={() => handleTabChange('dashboard')}>
            <HomeIcon className="w-6 h-6" /> <label>Dashboard</label>
          </Tab>
          <Tab className="flex" onClick={() => handleTabChange('users')}>
            <UserIcon className="w-6 h-6" /> Users
          </Tab>
          <Tab className="flex" onClick={() => handleTabChange('results')}>
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
