import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = (): JSX.Element => {
  return (
    <div className="page home-page">
      <div className="page-content">
        <div className="hero-section">
          <h1>Welcome to Task Management</h1>
          <p>Stay organized and productive with our powerful task management system</p>
          <Link to="/tasks" className="cta-button">
            Get Started →
          </Link>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Organize Tasks</h3>
            <p>Create, organize, and manage all your tasks in one centralized location</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Responsive</h3>
            <p>Built with React and Vite for lightning-fast performance and real-time updates</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Set Priorities</h3>
            <p>Mark tasks as low, medium, or high priority to focus on what matters most</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Track Progress</h3>
            <p>Change task status from pending to in-progress to completed</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3>Tag & Label</h3>
            <p>Organize tasks with tags and labels for easy filtering and searching</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Save Progress</h3>
            <p>All your tasks are automatically saved and synchronized across all devices</p>
          </div>
        </div>

        <div className="info-section">
          <h2>How It Works</h2>
          <ol className="steps">
            <li>
              <span className="step-number">1</span>
              <div className="step-content">
                <h4>Create a Task</h4>
                <p>Click "New Task" and fill in the details</p>
              </div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div className="step-content">
                <h4>Set Priority & Due Date</h4>
                <p>Assign priority level and deadlines</p>
              </div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div className="step-content">
                <h4>Track Progress</h4>
                <p>Update status as you work on tasks</p>
              </div>
            </li>
            <li>
              <span className="step-number">4</span>
              <div className="step-content">
                <h4>Complete & Archive</h4>
                <p>Mark tasks as complete when done</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
