import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, LogOut, GraduationCap, Home, FileText, Clock, Info } from 'lucide-react';

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(3);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { path: '/user/beranda', label: 'Beranda' },
    { path: '/user/tentang', label: 'Tentang' },
    { path: '/user/laporan', label: 'Laporan' },
    { path: '/user/status', label: 'Status' },
    { path: '/user/riwayat', label: 'Riwayat' },
  ];

  const getCurrentPage = () => {
    const found = menuItems.find(item => location.pathname === item.path);
    return found ? found.label : 'Beranda';
  };

  const today = new Date();
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  const dateStr = `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  return (
    <div className="min-h-screen bg-paper">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-paper border-b border-gray-200/60">
        <div className="flex items-center justify-between px-10 py-3 border-b border-gray-100/60">
          {/* Logo */}
          <Link to="/user/beranda" className="serif text-xl font-black text-ink tracking-tight">
            Fasil<span className="text-accent">Ku</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <span className="mono text-[10px] text-ink-4 tracking-widest">{dateStr}</span>
            
            {/* Notification */}
            <div className="relative w-7 h-7 border border-gray-200/60 rounded flex items-center justify-center cursor-pointer hover:bg-paper-2">
              <Bell size={14} className="text-ink-2" />
              {notifications > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-full"></span>}
            </div>

            {/* User Chip */}
            <div className="flex items-center gap-2 pl-2 pr-3 py-1 border border-gray-200/60 rounded cursor-pointer hover:bg-paper-2">
              <div className="w-6 h-6 bg-ink rounded-full flex items-center justify-center">
                <span className="serif text-[10px] text-paper">{initials}</span>
              </div>
              <span className="text-xs text-ink-2">{user.name || 'User'}</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 text-xs border border-gray-200/60 rounded hover:bg-paper-2 transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex justify-center gap-9 py-2.5 px-10">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`mono text-[11px] tracking-wider uppercase transition-colors pb-1 border-b-2 ${
                  isActive
                    ? 'text-ink border-accent font-medium'
                    : 'text-ink-3 border-transparent hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200/60 px-10 py-3.5 flex justify-between items-center">
        <div className="serif text-sm font-black text-ink">FasilKu</div>
        <div className="mono text-[10px] text-ink-4">© 2026 · SMA Negeri 1 · Platform Laporan Fasilitas · Tanpa Iklan</div>
      </div>
    </div>
  );
};

export default UserLayout;
