import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, AlertCircle, Check } from 'lucide-react';
import { register } from '../api/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok!');
      setLoading(false);
      return;
    }

    try {
      const response = await register(formData);
      if (response.data.success) {
        navigate('/login', { state: { success: 'Registrasi berhasil! Silakan login.' } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: 'Minimal 8 karakter' },
    { met: /[A-Z]/.test(formData.password), text: 'Memiliki huruf besar' },
    { met: /[0-9]/.test(formData.password), text: 'Memiliki angka' },
  ];

  return (
    <div className="min-h-screen bg-editorial-bg flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-editorial-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="font-serif text-4xl font-bold mb-4">Bergabunglah dengan<br />Fasilita</h2>
            <p className="text-lg opacity-90">Bantu kami memperbaiki sekolah kita</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="flex items-center gap-2 text-editorial-accent mb-4">
              <GraduationCap size={28} />
              <span className="font-serif text-2xl font-bold">Fasilita</span>
            </Link>
            <h1 className="font-serif text-4xl font-bold text-editorial-text mb-2">Daftar Akun</h1>
            <p className="text-editorial-muted">Buat akun untuk memulai melaporkan kerusakan</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-accent focus:border-transparent outline-none transition"
                placeholder="Nama lengkap Anda"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-accent focus:border-transparent outline-none transition"
                placeholder="email@sekolah.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-accent focus:border-transparent outline-none transition pr-12"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {formData.password && (
                <div className="mt-3 space-y-1">
                  {passwordRequirements.map((req, idx) => (
                    <div key={idx} className={`flex items-center gap-2 text-sm ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                      <Check size={14} className={req.met ? 'opacity-100' : 'opacity-30'} />
                      {req.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-editorial-accent focus:border-transparent outline-none transition"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Mendaftarkan...' : 'Daftar'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-editorial-accent font-medium hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
