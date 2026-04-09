import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AdminDashboard = () => {
  // Stats
  const stats = [
    { label: 'Total Laporan', value: '47', color: 'border-info', sub: '+5 minggu ini' },
    { label: 'Belum Ditangani', value: '12', color: 'border-accent', sub: 'Perlu tindakan' },
    { label: 'Sedang Proses', value: '8', color: 'border-warning', sub: 'Teknisi aktif' },
    { label: 'Selesai', value: '27', color: 'border-success', sub: 'Tingkat selesai 57%' },
  ];

  // Bar chart data
  const barData = {
    labels: ['Januari', 'Februari', 'Maret', 'April'],
    datasets: [
      {
        label: 'Masuk',
        data: [8, 12, 15, 12],
        backgroundColor: '#1a1814',
        borderRadius: 3,
        barPercentage: 0.6,
      },
      {
        label: 'Selesai',
        data: [6, 10, 11, 0],
        backgroundColor: '#e8e5df',
        borderRadius: 3,
        barPercentage: 0.6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 }, color: '#7a776f' },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        ticks: { font: { size: 10 }, color: '#7a776f' },
        beginAtZero: true,
      },
    },
  };

  // Donut chart data
  const donutData = {
    labels: ['Elektronik', 'Bangunan', 'Listrik', 'Keamanan', 'Lainnya'],
    datasets: [
      {
        data: [14, 9, 7, 5, 12],
        backgroundColor: ['#1a4a7a', '#c87a00', '#a82424', '#2d6a2d', '#7a776f'],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    cutout: '62%',
  };

  // Recent reports
  const recentReports = [
    { no: '#047', title: 'PC Lab Komputer Unit 7 tidak menyala', pelapor: 'Budi S.', lokasi: 'Lab Komputer', urgensi: 'Kritis', status: 'Menunggu', badge: 'bg-red-100 text-danger' },
    { no: '#046', title: 'Atap bocor saat hujan deras', pelapor: 'Ibu Rina', lokasi: 'Kelas 9B', urgensi: 'Kritis', status: 'Proses', badge: 'bg-yellow-100 text-warning' },
    { no: '#045', title: 'Lampu kelas mati 3 titik', pelapor: 'Siti N.', lokasi: 'Kelas 8A', urgensi: 'Sedang', status: 'Proses', badge: 'bg-yellow-100 text-warning' },
    { no: '#043', title: 'Pintu kelas 7C tidak bisa dikunci', pelapor: 'Ahmad R.', lokasi: 'Kelas 7C', urgensi: 'Rendah', status: 'Menunggu', badge: 'bg-blue-100 text-info' },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-2.5 mb-4.5">
        {stats.map((stat, idx) => (
          <div key={idx} className={`bg-paper border-t-4 ${stat.color} border rounded p-3.5`}>
            <div className="mono text-[9px] tracking-wider uppercase text-ink-3 mb-1.75">{stat.label}</div>
            <div className="serif text-[28px] font-black text-ink leading-none">{stat.value}</div>
            <div className="text-xs text-ink-3 mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-3.5 mb-3.5">
        {/* Bar Chart */}
        <div className="col-span-2 bg-paper border border-gray-200/60 rounded overflow-hidden">
          <div className="px-4 py-2.75 border-b border-gray-100/60 flex justify-between items-center">
            <span className="text-xs font-medium">Laporan per bulan</span>
            <span className="mono text-[9px] text-ink-3">Jan — Apr 2026</span>
          </div>
          <div className="p-4" style={{ height: '190px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
          <div className="px-4 pb-3 flex gap-5">
            <div className="flex items-center gap-1.5 text-xs text-ink-3">
              <span className="w-2 h-2 bg-ink rounded-sm"></span>
              Masuk
            </div>
            <div className="flex items-center gap-1.5 text-xs text-ink-3">
              <span className="w-2 h-2 bg-paper-3 rounded-sm"></span>
              Selesai
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-paper border border-gray-200/60 rounded overflow-hidden">
          <div className="px-4 py-2.75 border-b border-gray-100/60">
            <span className="text-xs font-medium">Kategori</span>
          </div>
          <div className="p-4" style={{ height: '150px' }}>
            <Doughnut data={donutData} options={donutOptions} />
          </div>
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-[11px] text-ink-3">
              <span className="w-2 h-2 rounded-sm bg-info"></span>Elektronik
            </div>
            <div className="flex items-center gap-1 text-[11px] text-ink-3">
              <span className="w-2 h-2 rounded-sm bg-[#c87a00]"></span>Bangunan
            </div>
            <div className="flex items-center gap-1 text-[11px] text-ink-3">
              <span className="w-2 h-2 rounded-sm bg-danger"></span>Listrik
            </div>
            <div className="flex items-center gap-1 text-[11px] text-ink-3">
              <span className="w-2 h-2 rounded-sm bg-success"></span>Keamanan
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-paper border border-gray-200/60 rounded overflow-hidden">
        <div className="px-4 py-2.75 border-b border-gray-100/60 flex justify-between items-center">
          <span className="text-xs font-medium">Laporan terbaru</span>
          <Link to="/admin/laporan-masuk" className="text-xs text-accent hover:underline">Lihat semua</Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-paper-2">
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">No.</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Judul</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Pelapor</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Lokasi</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Urgensi</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Status</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((report, idx) => (
              <tr key={idx} className="border-t border-gray-100/60 hover:bg-paper-2">
                <td className="px-3.5 py-2 mono text-[10px] text-ink-3">{report.no}</td>
                <td className="px-3.5 py-2 font-medium text-ink">{report.title}</td>
                <td className="px-3.5 py-2 text-ink-2">{report.pelapor}</td>
                <td className="px-3.5 py-2 text-ink-2">{report.lokasi}</td>
                <td className="px-3.5 py-2">
                  <span className={`badge ${
                    report.urgensi === 'Kritis' ? 'bg-red-100 text-danger' : 'bg-yellow-100 text-warning'
                  }`}>
                    {report.urgensi}
                  </span>
                </td>
                <td className="px-3.5 py-2">
                  <span className={`badge ${report.badge}`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-3.5 py-2">
                  <div className="flex gap-1">
                    <button className="text-[11px] px-2 py-1 bg-ink text-paper rounded hover:bg-ink-2 transition-colors">
                      Tugaskan
                    </button>
                    <button className="text-[11px] px-2 py-1 border border-gray-200/60 rounded hover:bg-paper-2 transition-colors">
                      Detail
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
