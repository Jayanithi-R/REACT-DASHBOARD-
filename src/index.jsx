import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './app/HomePage';
import SchedulePage from './app/schedule/SchedulePage';
import BoardPage from './app/board/BoardPage';
import BacklogPage from './app/backlog/BacklogPage';
import AttendancePage from './app/attendance/AttendancePage';
import ReportsPage from './app/reports/ReportsPage';
import SettingsPage from './app/settings/SettingsPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/backlog" element={<BacklogPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
