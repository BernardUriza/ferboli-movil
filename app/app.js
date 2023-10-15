"use client"
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Users from './Users';
import Results from './Results';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@tremor/react";
import { HomeIcon, UserIcon, SearchIcon } from '@heroicons/react/outline';
import { useUser } from '@auth0/nextjs-auth0/client';
import { HiOutlineArrowRightOnRectangle, HiMiniArrowLeftOnRectangle } from "react-icons/hi2";


const Tabs = () => {
    return (
        <TabGroup>
            <TabList className="tabs">
                <Tab className="flex">
                    <HomeIcon className="w-6 h-6" /> <label>Dashboard</label>
                </Tab>
                <Tab className="flex">
                    <UserIcon className="w-6 h-6" /> Users
                </Tab>
                <Tab className="flex">
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
    );
};


const Menu = ({ user, isLoading }) => {
    return (
      <div className="container px-1 mx-auto my-5 font-sans">
        {isLoading && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-100 flex items-center justify-center">
                <div className="spinner border-t-4 border-blue-500 rounded-full h-16 w-16"></div>
            </div>
        )}
        <div className="flex items-center my-5 space-x-4 flex-col lg:flex-row justify-between">
          <div className="w-28">
            <img src="/images/ferboliMovil.png" alt="Logo Image" className="mx-auto my-auto" />
          </div>
          <div className="flex-1">
            <div className="text-gray-700 text-xl lg:text-2xl font-normal leading-7 lg:leading-10">
              {user ? `Bienvenido, ${user.name}` : "Favor de ingresar para ver el contenido."}
            </div>
            <div className="text-gray-500 text-base lg:text-xl font-normal leading-5 lg:leading-7">
              Panel de administración
            </div>
          </div>
          <div className="w-28 lg:w-auto my-auto" style={{ alignSelf: 'flex-end' }}>
            {user ? (
              <a href='/api/auth/logout' className="text-gray-500 hover:text-blue-700 flex items-center focus:outline-none">
                Salir
                <HiOutlineArrowRightOnRectangle className="mx-1 w-6 h-6" />
              </a>
            ) : (
              <a href='/api/auth/login' className="text-gray-500 hover:text-blue-700 flex items-center focus:outline-none">
                Login
                <HiMiniArrowLeftOnRectangle className="mx-1 w-6 h-6" />
              </a>
            )}
          </div>
        </div>
        {user ? (
              <Tabs />
            ) : (
                <NotFound />
            )}
      </div>
    );
  };
  const NotFound = () => {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Usuario no ha ingresado</h2>
          <p className="text-gray-600 text-lg">
            Asegurése de que su usuario tiene permisos de administrador, dando click en el botón para login.
          </p>
        </div>
      </div>
    );
  };
  
const App = () => {
    const { user, isLoading } = useUser();

    return (<>
        <Menu isLoading={isLoading} user={user}></Menu>
    </>
    );
};

export default App;