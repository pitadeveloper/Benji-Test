# 🎯 TaskFlow - React Todo & Projects App

A comprehensive multi-page React application for managing projects and tasks with deep UI workflows. Perfect for testing UI state bugs and complex interactions!

## ✨ Features

### Pages
- **Dashboard** - Overview with stats and recent activity
- **Projects** - Manage all projects with progress tracking
- **Project Detail** - View and manage tasks within a project
- **Tasks** - View all tasks with advanced filtering
- **Settings** - Configure app preferences

### Workflows
- ✅ Create project with custom colors
- ✅ Rename project
- ✅ Delete project (with cascading task deletion)
- ✅ Add task with priority levels
- ✅ Complete/uncomplete tasks
- ✅ Delete tasks
- ✅ Filter tasks by priority, status, and project
- ✅ Search tasks by title
- ✅ Navigate between pages
- ✅ Open/close modals
- ✅ Sidebar collapse/expand
- ✅ Settings management

### UI State Complexity
This app includes numerous opportunities for UI state bugs:
- Modal open/close state management
- Form state across multiple modals
- Filter combinations (search + priority + status + project)
- Sidebar collapse state persistence
- Task completion toggling
- Cascading deletes (project → tasks)
- Progress calculations
- Navigation state
- Settings persistence

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build
```bash
npm run build
```

## 🛠️ Tech Stack
- **React 18** - UI framework
- **React Router 6** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## 📁 Project Structure
```
src/
├── components/
│   ├── Layout.jsx       # Main layout with sidebar
│   ├── Sidebar.jsx      # Navigation sidebar
│   └── Modal.jsx        # Reusable modal component
├── pages/
│   ├── Dashboard.jsx    # Dashboard overview
│   ├── Projects.jsx     # Projects list
│   ├── ProjectDetail.jsx # Single project view
│   ├── Tasks.jsx        # All tasks view
│   └── Settings.jsx     # Settings page
├── context/
│   └── AppContext.jsx   # Global state management
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🎨 Features for Testing

### State Management
- Global context with multiple state slices
- Local component state for forms
- Modal state management
- Filter state combinations

### User Interactions
- Form submissions
- Button clicks
- Checkbox toggles
- Dropdown selections
- Search input
- Navigation clicks
- Modal interactions

### Data Flows
- Create operations
- Read operations
- Update operations
- Delete operations
- Cascading deletes
- Computed values (progress, counts)

## 🐛 Potential Bug Scenarios

This app is designed to expose common UI bugs:
1. Modal state not resetting on close
2. Form data persisting between modals
3. Filter state conflicts
4. Stale data after deletions
5. Progress calculation errors
6. Navigation state issues
7. Sidebar state not persisting
8. Task completion race conditions
9. Search + filter combination bugs
10. Settings not saving properly

Perfect for testing debugging tools like Benji! 🎯
