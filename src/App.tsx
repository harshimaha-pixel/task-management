import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { TasksPage } from './pages/TasksPage';
import './App.css';

export const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2025 Task Management. Built with React + TypeScript.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
