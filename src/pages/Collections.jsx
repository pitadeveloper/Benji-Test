import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, StickyNote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/Modal';

const Collections = () => {
  const { collections, notes, addCollection, updateCollection, deleteCollection } = useApp();
  const navigate = useNavigate();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [formData, setFormData] = useState({ name: '', color: '#fbbf24' });

  const colors = ['#fbbf24', '#fb923c', '#a78bfa', '#f472b6', '#34d399', '#60a5fa'];

  const handleCreateCollection = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      addCollection(formData.name, formData.color);
      setFormData({ name: '', color: '#fbbf24' });
      setIsCreateModalOpen(false);
    }
  };

  const handleEditCollection = (e) => {
    e.preventDefault();
    if (formData.name.trim() && selectedCollection) {
      updateCollection(selectedCollection.id, { name: formData.name, color: formData.color });
      setIsEditModalOpen(false);
      setSelectedCollection(null);
      setFormData({ name: '', color: '#fbbf24' });
    }
  };

  const handleDeleteCollection = () => {
    if (selectedCollection) {
      deleteCollection(selectedCollection.id);
      setIsDeleteModalOpen(false);
      setSelectedCollection(null);
    }
  };

  const openEditModal = (collection) => {
    setSelectedCollection(collection);
    setFormData({ name: collection.name, color: collection.color });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (collection) => {
    setSelectedCollection(collection);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">Collections</h1>
          <p className="text-gray-600">Organize your sticky notes into collections</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-yellow-900 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-semibold"
        >
          <Plus size={20} />
          New Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => {
          const collectionNotes = notes.filter(n => n.collectionId === collection.id);
          const completedCount = collectionNotes.filter(n => n.completed).length;

          return (
            <div
              key={collection.id}
              className="relative group"
            >
              <div
                className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-rotate-1 hover:scale-105"
                style={{ backgroundColor: collection.color }}
                onClick={() => navigate(`/collections/${collection.id}`)}
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{collection.name}</h3>
                  <div className="flex items-center gap-2 text-gray-700">
                    <StickyNote size={18} />
                    <span className="font-medium">{collectionNotes.length} notes</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <span>Completed</span>
                    <span className="font-semibold">{completedCount}/{collectionNotes.length}</span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2">
                    <div
                      className="bg-gray-900 h-2 rounded-full transition-all"
                      style={{ width: `${collectionNotes.length > 0 ? (completedCount / collectionNotes.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(collection);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex-1 shadow"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openDeleteModal(collection);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-1 shadow"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Collection"
      >
        <form onSubmit={handleCreateCollection} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collection Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter collection name"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-12 h-12 rounded-xl transition-transform ${
                    formData.color === color ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Collection"
      >
        <form onSubmit={handleEditCollection} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collection Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="Enter collection name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-12 h-12 rounded-xl transition-transform ${
                    formData.color === color ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Collection"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete "{selectedCollection?.name}"? This will also delete all notes in this collection.
          </p>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCollection}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Collections;
