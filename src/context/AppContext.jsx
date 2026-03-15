import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const initialCollections = [
  { id: 1, name: 'Work Ideas', color: '#fbbf24', createdAt: new Date().toISOString() },
  { id: 2, name: 'Personal', color: '#a78bfa', createdAt: new Date().toISOString() },
  { id: 3, name: 'Shopping List', color: '#fb923c', createdAt: new Date().toISOString() },
];

const initialNotes = [
  { id: 1, collectionId: 1, content: 'Design new landing page with modern gradient', completed: false, priority: 'high', createdAt: new Date().toISOString() },
  { id: 2, collectionId: 1, content: 'Update brand colors for consistency', completed: true, priority: 'low', createdAt: new Date().toISOString() },
  { id: 3, collectionId: 2, content: 'Book dentist appointment for next week', completed: false, priority: 'high', createdAt: new Date().toISOString() },
  { id: 4, collectionId: 2, content: 'Plan weekend hiking trip', completed: false, priority: 'low', createdAt: new Date().toISOString() },
  { id: 5, collectionId: 3, content: 'Buy groceries - milk, eggs, bread', completed: false, priority: 'low', createdAt: new Date().toISOString() },
];

export const AppProvider = ({ children }) => {
  const [collections, setCollections] = useState(initialCollections);
  const [notes, setNotes] = useState(initialNotes);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    autoSave: true,
  });

  const addCollection = (name, color) => {
    const newCollection = {
      id: Date.now(),
      name,
      color: color || '#fbbf24',
      createdAt: new Date().toISOString(),
    };
    setCollections([...collections, newCollection]);
    return newCollection;
  };

  const updateCollection = (id, updates) => {
    setCollections(collections.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteCollection = (id) => {
    setCollections(collections.filter(c => c.id !== id));
    setNotes(notes.filter(n => n.collectionId !== id));
  };

  const addNote = (collectionId, content, priority = 'low') => {
    const newNote = {
      id: Date.now(),
      collectionId,
      content,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
    return newNote;
  };

  const updateNote = (id, updates) => {
    setNotes(notes.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const toggleNoteComplete = (id) => {
    setNotes(notes.map(n => n.id === id ? { ...n, completed: !n.completed } : n));
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  const getCollectionNotes = (collectionId) => {
    return notes.filter(n => n.collectionId === collectionId);
  };

  const getCollection = (id) => {
    return collections.find(c => c.id === id);
  };

  const value = {
    collections,
    notes,
    sidebarCollapsed,
    settings,
    addCollection,
    updateCollection,
    deleteCollection,
    addNote,
    updateNote,
    deleteNote,
    toggleNoteComplete,
    toggleSidebar,
    updateSettings,
    getCollectionNotes,
    getCollection,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
