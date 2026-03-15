import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Folder, StickyNote, Settings, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar } = useApp();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/collections', icon: Folder, label: 'Collections' },
    { path: '/notes', icon: StickyNote, label: 'All Notes' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full bg-gradient-to-b from-yellow-50 to-orange-50 border-r border-yellow-200 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-yellow-200">
        {!sidebarCollapsed && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Smart Sticky Notes</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-yellow-100 transition-colors text-yellow-700"
        >
          {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-yellow-200 text-yellow-900 shadow-sm'
                  : 'text-yellow-800 hover:bg-yellow-100'
              }`
            }
          >
            <item.icon size={20} />
            {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
