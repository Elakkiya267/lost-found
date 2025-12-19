import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Signup from './components/Signup';
import Login from './components/Login';
import ReportLost from './components/ReportLost';
import ReportFound from './components/ReportFound';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Navbar from './components/Navbar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleLogin = (newToken, userRole) => {
    setToken(newToken);
    setRole(userRole);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', userRole);
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {token && <Navbar role={role} onLogout={handleLogout} />}
      <main className={token ? "pt-16" : ""}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/report-lost" element={token ? <ReportLost token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="/report-found" element={token ? <ReportFound token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="/admin" element={token && role === 'admin' ? <AdminDashboard token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="/" element={token ? <UserDashboard token={token} role={role} /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;