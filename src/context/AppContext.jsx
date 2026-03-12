import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const initialProjects = [
  { id: 1, name: 'Website Redesign', color: '#3b82f6', createdAt: new Date().toISOString() },
  { id: 2, name: 'Mobile App', color: '#10b981', createdAt: new Date().toISOString() },
  { id: 3, name: 'Marketing Campaign', color: '#f59e0b', createdAt: new Date().toISOString() },
];

const initialTasks = [
  { id: 1, projectId: 1, title: 'Design homepage mockup', completed: false, priority: 'high', createdAt: new Date().toISOString() },
  { id: 2, projectId: 1, title: 'Review color palette', completed: true, priority: 'medium', createdAt: new Date().toISOString() },
  { id: 3, projectId: 2, title: 'Setup React Native project', completed: false, priority: 'high', createdAt: new Date().toISOString() },
  { id: 4, projectId: 2, title: 'Design app icon', completed: false, priority: 'low', createdAt: new Date().toISOString() },
  { id: 5, projectId: 3, title: 'Create social media posts', completed: false, priority: 'medium', createdAt: new Date().toISOString() },
];

export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    autoSave: true,
  });

  const addProject = (name, color) => {
    const newProject = {
      id: Date.now(),
      name,
      color: color || '#6366f1',
      createdAt: new Date().toISOString(),
    };
    setProjects([...projects, newProject]);
    return newProject;
  };

  const updateProject = (id, updates) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    setTasks(tasks.filter(t => t.projectId !== id));
  };

  const addTask = (projectId, title, priority = 'medium') => {
    const newTask = {
      id: Date.now(),
      projectId,
      title,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  const getProjectTasks = (projectId) => {
    return tasks.filter(t => t.projectId === projectId);
  };

  const getProject = (id) => {
    return projects.find(p => p.id === id);
  };

  const value = {
    projects,
    tasks,
    sidebarCollapsed,
    settings,
    addProject,
    updateProject,
    deleteProject,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    toggleSidebar,
    updateSettings,
    getProjectTasks,
    getProject,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
