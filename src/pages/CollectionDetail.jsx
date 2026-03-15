import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';

const CollectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCollection, getCollectionNotes, addNote, deleteNote, toggleNoteComplete } = useApp();
  
  const collection = getCollection(parseInt(id));
  const notes = getCollectionNotes(parseInt(id));
  
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [noteFormData, setNoteFormData] = useState({ content: '', priority: 'low' });

  if (!collection) {
    return (
      <div className="p-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Collection not found</h2>
          <button
            onClick={() => navigate('/collections')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Back to Collections
          </button>
        </div>
      </div>
    );
  }

  const handleAddNote = (e) => {
    e.preventDefault();
    if (noteFormData.content.trim()) {
      addNote(collection.id, noteFormData.content, noteFormData.priority);
      setNoteFormData({ content: '', priority: 'low' });
      setIsAddNoteModalOpen(false);
    }
  };

  const completedNotes = notes.filter(n => n.completed);
  const pendingNotes = notes.filter(n => !n.completed);
  const progress = notes.length > 0 ? (completedNotes.length / notes.length) * 100 : 0;

  return (
    <div className="p-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 min-h-screen">
      <button
        onClick={() => navigate('/collections')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Collections
      </button>

      <div className="rounded-2xl shadow-xl p-8 mb-6" style={{ backgroundColor: collection.color }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{collection.name}</h1>
          <button
            onClick={() => setIsAddNoteModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold"
          >
            <Plus size={20} />
            Add Note
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center bg-white/30 rounded-xl p-4">
            <p className="text-3xl font-bold text-gray-900">{notes.length}</p>
            <p className="text-sm text-gray-700 font-medium">Total Notes</p>
          </div>
          <div className="text-center bg-white/30 rounded-xl p-4">
            <p className="text-3xl font-bold text-green-700">{completedNotes.length}</p>
            <p className="text-sm text-gray-700 font-medium">Completed</p>
          </div>
          <div className="text-center bg-white/30 rounded-xl p-4">
            <p className="text-3xl font-bold text-orange-700">{pendingNotes.length}</p>
            <p className="text-sm text-gray-700 font-medium">Pending</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm text-gray-700 mb-2 font-medium">
            <span>Overall Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/50 rounded-full h-3">
            <div
              className="bg-gray-900 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {pendingNotes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-rotate-1 bg-yellow-100 border-l-4 border-yellow-500"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <button
                      onClick={() => toggleNoteComplete(note.id)}
                      className="text-gray-400 hover:text-green-600 transition-colors mt-1"
                    >
                      <Circle size={24} />
                    </button>
                    <p className="font-medium text-gray-900 flex-1 leading-relaxed">{note.content}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      note.priority === 'high' ? 'bg-red-200 text-red-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {note.priority}
                    </span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedNotes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-xl shadow-lg bg-gray-100 border-l-4 border-green-500 opacity-75"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <button
                      onClick={() => toggleNoteComplete(note.id)}
                      className="text-green-600 hover:text-gray-400 transition-colors mt-1"
                    >
                      <CheckCircle2 size={24} />
                    </button>
                    <p className="font-medium text-gray-900 flex-1 line-through leading-relaxed">{note.content}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      note.priority === 'high' ? 'bg-red-200 text-red-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {note.priority}
                    </span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {notes.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 mb-4 text-lg">No notes yet. Add your first sticky note to get started!</p>
            <button
              onClick={() => setIsAddNoteModalOpen(true)}
              className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 shadow-lg font-semibold"
            >
              Add Note
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        title="Add New Note"
      >
        <form onSubmit={handleAddNote} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note Content
            </label>
            <textarea
              value={noteFormData.content}
              onChange={(e) => setNoteFormData({ ...noteFormData, content: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
              placeholder="Write your note here..."
              rows="4"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {['low', 'high'].map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setNoteFormData({ ...noteFormData, priority })}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors font-medium ${
                    noteFormData.priority === priority
                      ? 'bg-yellow-500 text-white border-yellow-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-500'
                  }`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsAddNoteModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Add Note
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CollectionDetail;
