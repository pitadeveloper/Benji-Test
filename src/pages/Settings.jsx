import React, { useState } from 'react';
import { Save, Bell, Palette, Database } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Settings = () => {
  const { settings, updateSettings } = useApp();
  const [localSettings, setLocalSettings] = useState(settings);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    updateSettings(localSettings);
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">Settings</h1>
        <p className="text-gray-600">Manage your application preferences.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={localSettings.theme}
                onChange={(e) => setLocalSettings({ ...localSettings, theme: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Enable Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications for task updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.notifications}
                  onChange={(e) => setLocalSettings({ ...localSettings, notifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Data</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Auto-save</p>
                <p className="text-sm text-gray-600">Automatically save changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localSettings.autoSave}
                  onChange={(e) => setLocalSettings({ ...localSettings, autoSave: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-colors shadow-lg font-semibold"
          >
            <Save size={20} />
            Save Settings
          </button>
          {saveMessage && (
            <p className="text-green-600 font-medium">{saveMessage}</p>
          )}
        </div>

        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border border-yellow-200">
          <h3 className="font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-sm text-gray-600 mb-1 font-medium">Smart Sticky Notes v1.0.0</p>
          <p className="text-sm text-gray-600">A modern sticky notes and collection management app</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
