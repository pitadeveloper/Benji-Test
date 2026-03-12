import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, CheckSquare, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { projects, tasks } = useApp();
  const navigate = useNavigate();

  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && !t.completed).length;

  const stats = [
    { label: 'Total Projects', value: projects.length, icon: FolderKanban, color: 'bg-blue-500' },
    { label: 'Completed Tasks', value: completedTasks, icon: CheckSquare, color: 'bg-green-500' },
    { label: 'Pending Tasks', value: pendingTasks, icon: Clock, color: 'bg-yellow-500' },
    { label: 'High Priority', value: highPriorityTasks, icon: TrendingUp, color: 'bg-red-500' },
  ];

  const recentProjects = projects.slice(0, 3);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your project overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Projects</h2>
          <div className="space-y-3">
            {recentProjects.map((project) => {
              const projectTasks = tasks.filter(t => t.projectId === project.id);
              const completedCount = projectTasks.filter(t => t.completed).length;
              const progress = projectTasks.length > 0 ? (completedCount / projectTasks.length) * 100 : 0;

              return (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: project.color }}
                      />
                      <h3 className="font-medium text-gray-800">{project.name}</h3>
                    </div>
                    <span className="text-sm text-gray-600">
                      {completedCount}/{projectTasks.length} tasks
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Tasks</h2>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => {
              const project = projects.find(p => p.id === task.projectId);
              return (
                <div
                  key={task.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      readOnly
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {task.title}
                      </p>
                      {project && (
                        <p className="text-sm text-gray-500 mt-1">{project.name}</p>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority}
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
