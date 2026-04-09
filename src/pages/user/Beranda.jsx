import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Home, Lightbulb, Lock, Circle, Plus, Search } from 'lucide-react';

const Beranda = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const stats = [
    { label: 'Total Laporan', value: '47', color: 'text-ink' },
    { label: 'Menunggu', value: '12', color: 'text-accent' },
    { label: 'Sedang Proses', value: '8', color: 'text-warning' },
    { label: 'Selesai', value: '27', color: 'text-success' },
  ];

  const categories = [
    { 
      name: 'Perangkat Elektronik', 
      icon: Monitor, 
      bg: 'bg-red-100',
      stroke: 'stroke-red-700',
      count: '14 laporan aktif'
    },
    { 
      name: 'Bangunan / Atap', 
      icon: Home, 
      bg: 'bg-blue-100',
      stroke: 'stroke-info',
      count: '9 laporan aktif'
    },
    { 
      name: 'Listrik / Lampu', 
      icon: Lightbulb, 
      bg: 'bg-yellow-100',
      stroke: 'stroke-warning',
      count: '7 laporan aktif'
    },
    { 
      name: 'Keamanan / Kunci', 
      icon: Lock, 
      bg: 'bg-green-100',
      stroke: 'stroke-success',
      count: '5 laporan aktif'
    },
    { 
      name: 'Toilet / Sanitasi', 
      icon: Circle, 
      bg: 'bg-paper-2',
      stroke: 'stroke-ink-3',
      count: '6 laporan aktif'
    },
    { 
      name: 'Lainnya', 
      icon: Circle, 
      bg: 'bg-paper-2',
      stroke: 'stroke-ink-3',
      count: '6 laporan aktif'
    },
  ];

  const recentReports = [
    { title: 'PC Lab Komputer Unit 7 tidak menyala', status: 'Kritis', statusClass: 'bg-red-100 text-danger', date: '2 jam lalu', id: '#RPT-047' },
    { title: 'Atap bocor saat hujan deras — Kelas 9B', status: 'Proses', statusClass: 'bg-yellow-100 text-warning', date: '5 jam lalu', id: '#RPT-046' },
    { title: 'Lampu kelas mati 3 titik — Kelas 8A', status: 'Proses', statusClass: 'bg-yellow-100 text-warning', date: '1 hari lalu', id: '#RPT-045' },
    { title: 'Proyektor Aula tidak menampilkan gambar', status: 'Selesai', statusClass: 'bg-green-100 text-success', date: '3 hari lalu', id: '#RPT-044' },
    { title: 'Pintu kelas 7C tidak bisa dikunci', status: 'Menunggu', statusClass: 'bg-blue-100 text-info', date: '2 hari lalu', id: '#RPT-043' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-10 border-b border-gray-200/60">
        <div>
          <div className="mono text-[10px] tracking-widest uppercase text-ink-3 mb-3">
            Platform Laporan Fasilitas Sekolah · 2026
          </div>
          <h1 className="serif text-4xl font-black text-ink leading-tight mb-3">
            Laporkan kerusakan, <em className="text-accent not-italic">bersama</em> kita perbaiki.
          </h1>
          <p className="text-sm text-ink-3 leading-relaxed font-light max-w-[400px] mb-5">
            FasilKu memungkinkan setiap siswa dan warga sekolah melaporkan kerusakan fasilitas secara langsung. Setiap laporan ditindaklanjuti oleh tim teknis sekolah.
          </p>
          <div className="flex gap-2.5">
            <Link to="/user/laporan" className="btn-primary">
              Buat Laporan Baru
            </Link>
            <Link to="/user/status" className="btn-secondary">
              Pantau Status
            </Link>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-px bg-gray-200/60 border border-gray-200/60 rounded overflow-hidden">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-paper p-5 text-center">
              <div className={`serif text-3xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="mono text-[10px] tracking-wider uppercase text-ink-3 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-ink py-2.5 px-10 flex items-center gap-3.5 overflow-hidden -mx-8">
        <span className="mono text-[10px] tracking-widest bg-accent text-paper px-2 py-0.5 flex-shrink-0">Terbaru</span>
        <div className="flex animate-ticker whitespace-nowrap">
          <span className="mono text-[11px] text-white/55">
            PC Lab Komputer Unit 7 tidak menyala · Atap bocor Kelas 9B · Lampu Kelas 8A mati 3 titik · Proyektor Aula rusak · Pintu Kelas 7C tidak terkunci · AC Kelas 10A meneteskan air · 
          </span>
          <span className="mono text-[11px] text-white/55">
            PC Lab Komputer Unit 7 tidak menyala · Atap bocor Kelas 9B · Lampu Kelas 8A mati 3 titik · Proyektor Aula rusak · Pintu Kelas 7C tidak terkunci · AC Kelas 10A meneteskan air · 
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-b border-gray-200/60">
        {/* Main Content */}
        <div className="lg:col-span-2 p-9 border-r border-gray-200/60">
          <div className="mono text-[10px] tracking-widest uppercase text-ink-3 pb-3 border-b-2 border-ink mb-5">
            Kategori Kerusakan
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link 
                  key={idx} 
                  to="/user/laporan"
                  className="border border-gray-200/60 rounded p-4 cursor-pointer hover:border-ink hover:bg-paper-2 transition-all"
                >
                  <div className={`w-8 h-8 ${cat.bg} rounded flex items-center justify-center mb-2.5`}>
                    <Icon size={16} className={cat.stroke} />
                  </div>
                  <div className="text-xs font-medium text-ink mb-0.5">{cat.name}</div>
                  <div className="mono text-[10px] text-ink-3">{cat.count}</div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Recent Reports */}
        <div className="p-7">
          <div className="mono text-[10px] tracking-widest uppercase text-ink-3 pb-3 border-b-2 border-ink mb-5">
            Laporan Terkini
          </div>
          <div className="space-y-3">
            {recentReports.map((report, idx) => (
              <Link 
                key={idx} 
                to="/user/status"
                className="block py-3 border-b border-gray-100 last:border-0 hover:bg-paper-2 -mx-2 px-2 rounded transition-colors"
              >
                <div className="text-xs text-ink leading-relaxed mb-1 hover:underline">{report.title}</div>
                <div className="mono text-[10px] text-ink-3 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    report.status === 'Kritis' ? 'bg-accent' :
                    report.status === 'Proses' ? 'bg-warning' :
                    report.status === 'Selesai' ? 'bg-success' : 'bg-info'
                  }`}></span>
                  {report.status} · {report.date} · {report.id}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;
