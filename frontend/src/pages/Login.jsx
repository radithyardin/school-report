import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, AlertCircle } from 'lucide-react';
import { login } from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginRole, setLoginRole] = useState('siswa');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        
        if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/beranda');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex">
      {/* Left Side - Dark Sidebar */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar flex-col justify-between p-14">
        <div>
          <div className="serif text-[44px] font-black text-paper tracking-tight">FasilKu</div>
          <div className="mono text-[10px] tracking-[0.12em] uppercase text-gray-500 mt-2">Platform Laporan Fasilitas</div>
        </div>
        <div>
          <div className="serif text-xl italic text-white/55 leading-relaxed max-w-[300px]">
            "Sekolah yang baik dimulai dari fasilitas yang terawat dengan baik."
          </div>
          <div className="mono text-[10px] text-gray-500 mt-3">— Panduan Manajemen Sekolah Indonesia</div>
        </div>
        <div className="mono text-[9px] tracking-[0.1em] uppercase text-gray-600">Edisi Digital · Vol. I · 2026</div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-14">
        <div className="w-full max-w-[360px]">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-accent mb-4 lg:hidden">
              <GraduationCap size={28} />
              <span className="serif text-2xl font-black">FasilKu</span>
            </Link>
            <h1 className="serif text-2xl font-bold text-ink mb-1">Selamat datang</h1>
            <p className="text-sm text-ink-3 leading-relaxed">
              Masuk untuk melaporkan atau memantau kerusakan fasilitas sekolah.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b-2 border-gray-200 mb-6">
            <button
              className={`flex-1 text-center py-2 text-xs font-medium transition-colors ${
                loginRole === 'siswa'
                  ? 'text-ink border-b-2 border-ink -mb-px'
                  : 'text-ink-3 hover:text-ink'
              }`}
              onClick={() => setLoginRole('siswa')}
            >
              Siswa / Guru
            </button>
            <button
              className={`flex-1 text-center py-2 text-xs font-medium transition-colors ${
                loginRole === 'admin'
                  ? 'text-ink border-b-2 border-ink -mb-px'
                  : 'text-ink-3 hover:text-ink'
              }`}
              onClick={() => setLoginRole('admin')}
            >
              Admin
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mono text-[10px] tracking-wider uppercase text-ink-3 mb-1.5">
                NIS / NIP / Email
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 text-sm border border-paper-3 bg-paper-2 text-ink rounded focus:border-ink focus:bg-paper focus:outline-none focus:ring-0 transition"
                placeholder="Masukkan identitas Anda"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block mono text-[10px] tracking-wider uppercase text-ink-3 mb-1.5">
                Kata sandi
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-4 py-2.5 text-sm border border-paper-3 bg-paper-2 text-ink rounded focus:border-ink focus:bg-paper focus:outline-none focus:ring-0 transition"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-paper py-2.5 text-sm font-medium rounded hover:bg-ink-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-ink-4">
            Belum punya akun?{' '}
            <Link to="/register" className="text-accent font-medium hover:underline">
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
