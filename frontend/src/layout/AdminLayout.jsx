import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, LogOut, LayoutDashboard, FileText, BarChart3, Settings } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications] = useState(5);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AD';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/laporan-masuk', label: 'Laporan Masuk', icon: FileText, badge: 12 },
    { path: '/admin/grafik', label: 'Grafik Laporan', icon: BarChart3 },
  ];

  const getPageTitle = () => {
    const found = menuItems.find(item => location.pathname === item.path);
    return found ? found.label : 'Dashboard';
  };

  const today = new Date();
  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  const dateStr = `${days[today.getDay()]}, ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

  return (
    <div className="h-screen grid grid-cols-[210px_1fr] overflow-hidden">
      {/* Sidebar - Dark */}
      <div className="bg-sidebar flex flex-col h-full">
        {/* Logo */}
        <div className="p-4.5 pb-4 border-b border-white/5">
          <div className="serif text-xl font-black text-paper">FasilKu</div>
          <div className="mono text-[9px] tracking-widest uppercase text-gray-500 mt-0.5">Panel Admin</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3.5 overflow-y-auto">
          <div className="mono text-[9px] tracking-widest uppercase text-gray-500 px-3.5 pt-2 pb-1.5">Menu Utama</div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2.25 px-3.5 py-2.25 text-xs transition-colors border-l-2 ${
                  isActive
                    ? 'text-paper bg-white/7 border-accent'
                    : 'text-white/4 hover:text-white/75 hover:bg-white/4 border-transparent'
                }`}
              >
                <Icon size={14} className={isActive ? 'opacity-100' : 'opacity-60'} />
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-accent text-white mono text-[9px] px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="mono text-[9px] tracking-widest uppercase text-gray-500 px-3.5 pt-5 pb-1.5">Lainnya</div>
          <Link
            to="/admin/pengaturan"
            className={`flex items-center gap-2.25 px-3.5 py-2.25 text-xs transition-colors border-l-2 ${
              location.pathname === '/admin/pengaturan'
                ? 'text-paper bg-white/7 border-accent'
                : 'text-white/4 hover:text-white/75 hover:bg-white/4 border-transparent'
            }`}
          >
            <Settings size={14} className="opacity-60" />
            Pengaturan
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-3.5 border-t border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6.5 h-6.5 bg-white/10 rounded-full flex items-center justify-center">
              <span className="serif text-[10px] text-paper">{initials}</span>
            </div>
            <div>
              <div className="text-xs text-white/6">{user.name || 'Admin'}</div>
              <div className="mono text-[9px] text-gray-500">{user.email || 'admin@sekolah.com'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-1.5 text-xs bg-transparent border border-white/8 text-gray-500 rounded hover:text-paper hover:border-white/20 transition-colors"
          >
            Keluar dari Panel
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <div className="flex items-center justify-between px-7 py-3 border-b border-gray-200/60 bg-paper shrink-0">
          <div className="serif text-lg font-bold">{getPageTitle()}</div>
          <div className="flex items-center gap-2.5">
            <span className="mono text-[10px] text-ink-4">{dateStr}</span>
            
            <div className="relative w-7 h-7 border border-gray-200/60 rounded flex items-center justify-center cursor-pointer hover:bg-paper-2">
              <Bell size={14} className="text-ink-2" />
              {notifications > 0 && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-full"></span>}
            </div>

            <div className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 border border-gray-200/60 rounded">
              <div className="w-5.5 h-5.5 bg-ink rounded-full flex items-center justify-center">
                <span className="serif text-[10px] text-paper">{initials}</span>
              </div>
              <span className="text-xs text-ink-2">Admin</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
