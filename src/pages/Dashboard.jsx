import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, StickyNote, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { collections, notes } = useApp();
  const navigate = useNavigate();

  const completedNotes = notes.filter(n => n.completed).length;
  const pendingNotes = notes.filter(n => !n.completed).length;
  const highPriorityNotes = notes.filter(n => n.priority === 'high' && !n.completed).length;

  const stats = [
    { label: 'Total Collections', value: collections.length, icon: Folder, color: 'bg-yellow-400' },
    { label: 'Completed Notes', value: completedNotes, icon: StickyNote, color: 'bg-green-400' },
    { label: 'Pending Notes', value: pendingNotes, icon: Clock, color: 'bg-orange-400' },
    { label: 'High Priority', value: highPriorityNotes, icon: TrendingUp, color: 'bg-red-400' },
  ];

  const recentCollections = collections.slice(0, 3);

  return (
    <div className="p-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">Welcome back! Here's your sticky notes overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl shadow-md`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Collections</h2>
          <div className="space-y-3">
            {recentCollections.map((collection) => {
              const collectionNotes = notes.filter(n => n.collectionId === collection.id);
              const completedCount = collectionNotes.filter(n => n.completed).length;
              const progress = collectionNotes.length > 0 ? (completedCount / collectionNotes.length) * 100 : 0;

              return (
                <div
                  key={collection.id}
                  onClick={() => navigate(`/collections/${collection.id}`)}
                  className="p-4 rounded-xl cursor-pointer transition-all hover:shadow-lg transform hover:-rotate-1"
                  style={{ backgroundColor: collection.color }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{collection.name}</h3>
                    <span className="text-sm text-gray-700 font-semibold">
                      {completedCount}/{collectionNotes.length} notes
                    </span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div
                      className="bg-gray-900 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Notes</h2>
          <div className="space-y-3">
            {notes.slice(0, 5).map((note) => {
              const collection = collections.find(c => c.id === note.collectionId);
              return (
                <div
                  key={note.id}
                  className={`p-4 rounded-xl shadow-md border-l-4 ${
                    note.completed ? 'bg-gray-100' : 'bg-yellow-50'
                  }`}
                  style={{ borderLeftColor: collection?.color || '#fbbf24' }}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={note.completed}
                      readOnly
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${note.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {note.content}
                      </p>
                      {collection && (
                        <p className="text-sm text-gray-500 mt-1 font-medium">{collection.name}</p>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      note.priority === 'high' ? 'bg-red-200 text-red-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {note.priority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
