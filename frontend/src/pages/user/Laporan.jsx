import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Upload, X, Check, Monitor, Home, Lightbulb, Lock, Circle, Plus, ArrowLeft } from 'lucide-react';

const categories = [
  { id: 'elektronik', label: 'Elektronik', icon: Monitor },
  { id: 'bangunan', label: 'Bangunan', icon: Home },
  { id: 'listrik', label: 'Listrik', icon: Lightbulb },
  { id: 'keamanan', label: 'Keamanan', icon: Lock },
  { id: 'toilet', label: 'Toilet', icon: Circle },
  { id: 'lain', label: 'Lainnya', icon: Circle },
];

const urgencyLevels = [
  { id: 'kritis', label: 'Kritis', desc: 'Mengganggu KBM', color: 'bg-red-100 text-danger border-red-200' },
  { id: 'tinggi', label: 'Tinggi', desc: 'Perlu segera', color: 'bg-orange-100 text-warning border-orange-200' },
  { id: 'sedang', label: 'Sedang', desc: 'Bisa ditunda', color: 'bg-yellow-100 text-warning border-yellow-200' },
  { id: 'rendah', label: 'Rendah', desc: 'Tidak mendesak', color: 'bg-blue-100 text-info border-blue-200' },
];

const locations = [
  'Pilih lokasi...',
  'Lab Komputer — Lantai 2',
  'Ruang Kelas 7A',
  'Ruang Kelas 8A',
  'Ruang Kelas 9B',
  'Aula Sekolah',
  'Perpustakaan',
  'Kantin',
  'Toilet Putra/Putri',
  'Lapangan',
];

const Laporan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    urgency: 'sedang',
    location: '',
    description: '',
    photos: [],
  });

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [photoPreviews, setPhotoPreviews] = useState([]);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.photos.length + files.length > 3) {
      alert('Maksimal 3 foto!');
      return;
    }

    const newPhotos = [...formData.photos, ...files];
    setFormData({ ...formData, photos: newPhotos });

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...newPreviews]);
  };

  const removePhoto = (index) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: newPhotos });
    setPhotoPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate success
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  const resetForm = () => {
    setSuccess(false);
    setFormData({
      title: '',
      category: '',
      urgency: 'sedang',
      location: '',
      description: '',
      photos: [],
    });
    setPhotoPreviews([]);
    setSelectedCategory(0);
  };

  if (success) {
    return (
      <div className="max-w-[680px] mx-auto">
        <div className="text-center py-20 border-t-4 border-ink">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3.5">
            <Check size={26} className="text-success" />
          </div>
          <h2 className="serif text-2xl font-bold text-ink mb-2">Laporan berhasil dikirim!</h2>
          <p className="text-sm text-ink-3 max-w-[360px] mx-auto leading-relaxed mb-4">
            Terima kasih. Tim teknis sekolah akan segera menindaklanjuti laporan Anda dalam 1×24 jam.
          </p>
          <div className="mono text-xs text-ink-3 bg-paper-2 px-4 py-1.5 rounded inline-block mb-5 border border-gray-200">
            No. Laporan: #RPT-2026-048
          </div>
          <div className="flex gap-2.5 justify-center">
            <Link to="/user/status" className="btn-secondary">Pantau Status</Link>
            <button onClick={resetForm} className="btn-primary">Buat Laporan Lain</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[680px] mx-auto">
      {/* Header */}
      <div className="mb-6 pb-4.5 border-b-2 border-ink">
        <h1 className="serif text-2xl font-bold text-ink mb-1">Buat Laporan Kerusakan</h1>
        <p className="text-sm text-ink-3 leading-relaxed">
          Isi formulir berikut dengan lengkap agar tim teknis dapat menangani dengan cepat.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Name & Class */}
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="mono text-[10px] tracking-wider uppercase text-ink-3 mb-1 block">Nama lengkap</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200/60 bg-paper text-ink rounded focus:border-ink focus:outline-none focus:ring-0 transition"
              placeholder="Contoh: Budi Santoso"
            />
          </div>
          <div>
            <label className="mono text-[10px] tracking-wider uppercase text-ink-3 mb-1 block">Kelas / Jabatan</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200/60 bg-paper text-ink rounded focus:border-ink focus:outline-none focus:ring-0 transition"
              placeholder="Contoh: XI IPA 2 / Guru"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div>
          <label className="mono text-[10px] tracking-wider uppercase text-ink-3 mb-2 block">Kategori kerusakan</label>
          <div className="grid grid-cols-3 gap-1.5">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(idx)}
                  className={`flex items-center gap-1.5 px-3 py-2 border rounded text-xs transition-all ${
                    selectedCategory === idx
                      ? 'border-ink bg-ink text-paper'
                      : 'border-gray-200/60 text-ink-2 hover:border-ink hover:bg-paper-2'
                  }`}
                >
                  <Icon size={12} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location & Urgency */}
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="mono text-[10px] tracking-wider uppercase text-ink-3 mb-1 block">Lokasi kerusakan</label>
            <select
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200/60 bg-paper text-ink rounded focus:border-ink focus:outline-none focus:ring-0 transition appearance-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%237a776f' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            >
              {locations.map((loc, idx) => (
                <option key={idx} value={loc === 'Pilih lokasi...' ? '' : loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mono text-[10px] tracking-wider uppercase text-ink-3 mb-1 block">Tingkat urgensi</label>
            <select
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200/60 bg-paper text-ink rounded focus:border-ink focus:outline-none focus:ring-0 transition appearance-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%237a776f' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
              value={formData.urgency}
              onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
            >
              <option value="kritis">Kritis — mengganggu KBM</option>
              <option value="tinggi">Tinggi — perlu segera</option>
              <option value="sedang">Sedang — bisa ditunda</option>
              <option value="rendah">Rendah — tidak mendesak</option>
            </select>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="mono text-[10px] tracking-wider uppercase text-ink-3 mb-1 block">Judul kerusakan</label>
          <input
            type="text"
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200/60 bg-paper text-ink rounded focus:border-ink focus:outline-none focus:ring-0 transition"
            placeholder="Contoh: PC unit 7 tidak menyala"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="mono text-[10px] tracking-wider uppercase text-ink-3 mb-1 block">Deskripsi lengkap</label>
          <textarea
            rows={4}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-200/60 bg-paper text-ink rounded focus:border-ink focus:outline-none focus:ring-0 transition resize-none"
            placeholder="Jelaskan kondisi, kapan terjadi, dan dampaknya..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="mono text-[10px] tracking-wider uppercase text-ink-3 mb-1 block">Foto kerusakan <span className="text-ink-4">(opsional)</span></label>
          <div className="border border-dashed border-gray-200/60 rounded p-7 text-center cursor-pointer bg-paper-2 hover:border-ink hover:bg-paper transition-all">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer block">
              <Upload className="mx-auto mb-2 opacity-35" size={32} />
              <div className="text-sm text-ink-3">Klik atau seret foto ke sini</div>
              <div className="mono text-[10px] text-ink-4 mt-1">PNG, JPG · Maks. 5MB</div>
            </label>
          </div>

          {/* Photo Previews */}
          {photoPreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {photoPreviews.map((preview, idx) => (
                <div key={idx} className="relative group">
                  <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-20 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 pt-5 border-t border-gray-200/60">
          <button
            type="button"
            onClick={() => navigate('/user/beranda')}
            className="flex-1 px-4 py-2.5 border border-gray-200/60 bg-transparent text-ink-2 text-sm rounded hover:bg-paper-2 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-2 w-full px-4 py-2.5 bg-ink text-paper text-sm font-medium rounded hover:bg-ink-2 transition-colors disabled:opacity-50"
          >
            {loading ? 'Mengirim...' : 'Kirim Laporan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Laporan;
