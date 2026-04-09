import { useState } from 'react';
import { Search } from 'lucide-react';

const Status = () => {
  const [searchQuery, setSearchQuery] = useState('#RPT-2026-047');

  // Sample data
  const reports = [
    {
      id: '047',
      title: 'PC Lab Komputer Unit 7 tidak menyala',
      no: '#RPT-2026-047',
      pelapor: 'Budi Santoso',
      lokasi: 'Lab Komputer, Lt. 2',
      tgl: '6 Apr 2026, 08.30',
      urgensi: 'Kritis',
      status: 'Menunggu',
      badge: 'bg-red-100 text-danger',
      timeline: [
        { text: 'Laporan masuk dan menunggu verifikasi admin', time: '6 Apr 2026 · 08.30', color: 'bg-accent' },
        { text: 'Menunggu penugasan teknisi...', time: '', color: 'bg-ink-4' },
      ]
    },
    {
      id: '046',
      title: 'Atap bocor saat hujan deras',
      no: '#RPT-2026-046',
      pelapor: 'Ibu Rina',
      lokasi: 'Ruang Kelas 9B, Gedung A',
      tgl: '6 Apr 2026, 05.15',
      urgensi: 'Kritis',
      status: 'Proses',
      badge: 'bg-yellow-100 text-warning',
      timeline: [
        { text: 'Laporan diterima dan diverifikasi admin', time: '6 Apr 2026 · 07.00', color: 'bg-success' },
        { text: 'Teknisi Pak Agus ditugaskan untuk perbaikan', time: '6 Apr 2026 · 09.30', color: 'bg-warning' },
        { text: 'Menunggu penyelesaian...', time: '', color: 'bg-ink-4' },
      ]
    },
  ];

  return (
    <div className="p-9">
      <div className="mb-5">
        <h1 className="serif text-2xl font-bold text-ink mb-1">Status Laporan</h1>
        <p className="text-sm text-ink-3">Masukkan nomor laporan atau cari berdasarkan kata kunci.</p>
      </div>

      {/* Search */}
      <div className="flex gap-2.5 mb-6 pb-5.5 border-b border-gray-200/60">
        <input
          type="text"
          placeholder="Cari nomor laporan..."
          className="flex-1 px-3.5 py-2.5 text-sm border border-gray-200/60 bg-paper text-ink rounded focus:border-ink focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="px-5 py-2.5 bg-ink text-paper text-sm rounded hover:bg-ink-2 transition-colors">
          Cari
        </button>
      </div>

      {/* Reports */}
      <div className="space-y-3.5">
        {reports.map((report) => (
          <div key={report.id} className="border border-gray-200/60 rounded overflow-hidden">
            {/* Header */}
            <div className="px-4.5 py-3 border-b border-gray-200/60 flex justify-between items-center">
              <div>
                <div className="text-xs font-medium text-ink">{report.title}</div>
                <div className="mono text-[10px] text-ink-3 mt-0.5">{report.no}</div>
              </div>
              <span className={`badge ${report.badge}`}>
                {report.status.toUpperCase()}
              </span>
            </div>

            {/* Meta */}
            <div className="px-4.5 py-3 grid grid-cols-3 gap-2 border-b border-gray-200/60">
              <div>
                <div className="mono text-[9px] tracking-wider uppercase text-ink-3 mb-0.5">Lokasi</div>
                <div className="text-xs text-ink">{report.lokasi}</div>
              </div>
              <div>
                <div className="mono text-[9px] tracking-wider uppercase text-ink-3 mb-0.5">Pelapor</div>
                <div className="text-xs text-ink">{report.pelapor}</div>
              </div>
              <div>
                <div className="mono text-[9px] tracking-wider uppercase text-ink-3 mb-0.5">Tanggal</div>
                <div className="text-xs text-ink">{report.tgl}</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="px-4.5 py-3">
              <div className="mono text-[9px] tracking-wider uppercase text-ink-3 mb-2.5">Riwayat Tindakan</div>
              {report.timeline.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 py-1.5 border-b border-gray-100 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.color}`}></div>
                  <div>
                    <div className={`text-xs ${item.color === 'bg-ink-4' ? 'text-ink-4' : 'text-ink-2'}`}>{item.text}</div>
                    {item.time && <div className="mono text-[10px] text-ink-3 mt-0.5">{item.time}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
