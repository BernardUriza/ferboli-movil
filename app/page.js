"use client"
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Users from './Users';
import Results from './Results';

const Page = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => handleTabChange('dashboard')}>
          ICON Dashboard
        </button>
        <button onClick={() => handleTabChange('users')}>Users</button>
        <button onClick={() => handleTabChange('results')}>Results</button>
      </div>
      <div className="content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'users' && <Users />}
        {activeTab === 'results' && <Results />}
      </div>
    </div>
  );
};

export default Page;
