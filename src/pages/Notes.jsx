import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Notes = () => {
  const { notes, collections, toggleNoteComplete, deleteNote } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCollection, setFilterCollection] = useState('all');

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || note.priority === filterPriority;
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'completed' && note.completed) ||
      (filterStatus === 'pending' && !note.completed);
    const matchesCollection = filterCollection === 'all' || note.collectionId === parseInt(filterCollection);

    return matchesSearch && matchesPriority && matchesStatus && matchesCollection;
  });

  const completedCount = filteredNotes.filter(n => n.completed).length;
  const pendingCount = filteredNotes.filter(n => !n.completed).length;

  return (
    <div className="p-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">All Notes</h1>
        <p className="text-gray-600">View and manage all your sticky notes</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search size={16} className="inline mr-2" />
            Search Notes
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by content..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter size={16} className="inline mr-2" />
              Priority
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterPriority('all')}
                className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                  filterPriority === 'all'
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-500'
                }`}
              >
                All Priorities
              </button>
              <button
                onClick={() => setFilterPriority('high')}
                className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                  filterPriority === 'high'
                    ? 'bg-red-500 text-white border-red-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                }`}
              >
                High
              </button>
              <button
                onClick={() => setFilterPriority('medium')}
                className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                  filterPriority === 'medium'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setFilterPriority('low')}
                className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                  filterPriority === 'low'
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                }`}
              >
                Low
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter size={16} className="inline mr-2" />
              Status
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                  filterStatus === 'all'
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-500'
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                  filterStatus === 'pending'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                  filterStatus === 'completed'
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter size={16} className="inline mr-2" />
              Collection
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterCollection('all')}
                className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                  filterCollection === 'all'
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-500'
                }`}
              >
                All Collections
              </button>
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setFilterCollection(collection.id.toString())}
                  className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                    filterCollection === collection.id.toString()
                      ? 'bg-yellow-500 text-white border-yellow-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-500'
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Total:</span>
            <span className="font-bold text-gray-800">{filteredNotes.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Pending:</span>
            <span className="font-bold text-orange-600">{pendingCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Completed:</span>
            <span className="font-bold text-green-600">{completedCount}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredNotes.map((note) => {
          const collection = collections.find(c => c.id === note.collectionId);
          return (
            <div
              key={note.id}
              className={`p-5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-rotate-1 ${
                note.completed ? 'bg-gray-100 opacity-75' : 'bg-yellow-100'
              } border-l-4`}
              style={{ borderLeftColor: collection?.color || '#fbbf24' }}
            >
              <div className="flex items-start gap-3 mb-3">
                <button
                  onClick={() => toggleNoteComplete(note.id)}
                  className={`transition-colors mt-1 ${
                    note.completed ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                  }`}
                >
                  {note.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>
                <p className={`font-medium flex-1 leading-relaxed ${note.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {note.content}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  {collection && (
                    <div className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: collection.color }}
                      />
                      <span className="text-xs text-gray-600 font-medium">{collection.name}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    note.priority === 'high' ? 'bg-red-200 text-red-800' :
                    note.priority === 'medium' ? 'bg-orange-200 text-orange-800' :
                    note.priority === 'low' ? 'bg-green-200 text-green-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {note.priority}
                  </span>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredNotes.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No notes found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
