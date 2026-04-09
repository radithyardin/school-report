import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Pages
import Preloader from './pages/Preloader';
import Login from './pages/Login';
import Register from './pages/Register';
import UserLayout from './layout/UserLayout';
import AdminLayout from './layout/AdminLayout';

// User Pages
import Beranda from './pages/user/Beranda';
import Laporan from './pages/user/Laporan';
import Status from './pages/user/Status';
import Riwayat from './pages/user/Riwayat';
import Tentang from './pages/user/Tentang';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import LaporanMasuk from './pages/admin/LaporanMasuk';
import Grafik from './pages/admin/Grafik';

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/user/beranda'} replace />;
  }
  
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* User Routes */}
        <Route path="/user" element={
          <ProtectedRoute role="user">
            <UserLayout />
          </ProtectedRoute>
        }>
          <Route path="beranda" element={<Beranda />} />
          <Route path="laporan" element={<Laporan />} />
          <Route path="status" element={<Status />} />
          <Route path="riwayat" element={<Riwayat />} />
          <Route path="tentang" element={<Tentang />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="laporan-masuk" element={<LaporanMasuk />} />
          <Route path="grafik" element={<Grafik />} />
        </Route>
        
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
