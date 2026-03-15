import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useApp } from '../context/AppContext';

const Layout = () => {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="flex h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <Sidebar />
      <main className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
