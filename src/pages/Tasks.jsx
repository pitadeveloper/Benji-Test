import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Tasks = () => {
  const { tasks, projects, toggleTaskComplete, deleteTask } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProject, setFilterProject] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'completed' && task.completed) ||
      (filterStatus === 'pending' && !task.completed);
    const matchesProject = filterProject === 'all' || task.projectId === parseInt(filterProject);

    return matchesSearch && matchesPriority && matchesStatus && matchesProject;
  });

  const completedCount = filteredTasks.filter(t => t.completed).length;
  const pendingCount = filteredTasks.filter(t => !t.completed).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Tasks</h1>
        <p className="text-gray-600">View and manage all your tasks across projects.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Search size={16} className="inline mr-2" />
            Search Tasks
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  filterPriority === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                All Priorities
              </button>
              <button
                onClick={() => setFilterPriority('high')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  filterPriority === 'high'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                }`}
              >
                High
              </button>
              <button
                onClick={() => setFilterPriority('low')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  filterPriority === 'low'
                    ? 'bg-green-600 text-white border-green-600'
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
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  filterStatus === 'pending'
                    ? 'bg-yellow-600 text-white border-yellow-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-yellow-500'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  filterStatus === 'completed'
                    ? 'bg-green-600 text-white border-green-600'
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
              Project
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterProject('all')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  filterProject === 'all'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                All Projects
              </button>
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setFilterProject(project.id.toString())}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filterProject === project.id.toString()
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold text-gray-800">{filteredTasks.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Pending:</span>
            <span className="font-semibold text-yellow-600">{pendingCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Completed:</span>
            <span className="font-semibold text-green-600">{completedCount}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const project = projects.find(p => p.id === task.projectId);
          return (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className={`transition-colors ${
                    task.completed ? 'text-green-600' : 'text-gray-400 hover:text-blue-600'
                  }`}
                >
                  {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                </button>

                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    {project && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        <span className="text-sm text-gray-600">{project.name}</span>
                      </div>
                    )}
                    <span className="text-sm text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <span className={`text-xs px-3 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {task.priority}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">No tasks found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
