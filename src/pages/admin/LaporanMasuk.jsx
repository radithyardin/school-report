import { useState } from 'react';

const LaporanMasuk = () => {
  const [filter, setFilter] = useState(0);

  const filters = [
    { label: 'Semua (47)', count: 47 },
    { label: 'Kritis (12)', count: 12 },
    { label: 'Proses (8)', count: 8 },
    { label: 'Menunggu (8)', count: 8 },
    { label: 'Selesai (27)', count: 27 },
  ];

  // Sample reports data
  const reports = [
    { no: '#047', title: 'PC Lab Komputer Unit 7 tidak menyala', pelapor: 'Budi Santoso', lokasi: 'Lab Komputer', tgl: '6 Apr', urgensi: 'Kritis', status: 'Menunggu', badge: 'bg-red-100 text-danger', badge2: 'bg-blue-100 text-info' },
    { no: '#046', title: 'Atap bocor saat hujan deras', pelapor: 'Ibu Rina', lokasi: 'Kelas 9B', tgl: '6 Apr', urgensi: 'Kritis', status: 'Proses', badge: 'bg-red-100 text-danger', badge2: 'bg-yellow-100 text-warning' },
    { no: '#045', title: 'Lampu kelas mati 3 titik', pelapor: 'Siti Nuraini', lokasi: 'Kelas 8A', tgl: '5 Apr', urgensi: 'Sedang', status: 'Proses', badge: 'bg-yellow-100 text-warning', badge2: 'bg-yellow-100 text-warning' },
    { no: '#044', title: 'Proyektor Aula tidak menampilkan gambar', pelapor: 'Pak Darmawan', lokasi: 'Aula Sekolah', tgl: '3 Apr', urgensi: 'Sedang', status: 'Selesai', badge: 'bg-yellow-100 text-warning', badge2: 'bg-green-100 text-success' },
    { no: '#043', title: 'Pintu kelas 7C tidak bisa dikunci', pelapor: 'Ahmad Ridwan', lokasi: 'Kelas 7C', tgl: '4 Apr', urgensi: 'Rendah', status: 'Menunggu', badge: 'bg-blue-100 text-info', badge2: 'bg-blue-100 text-info' },
    { no: '#042', title: 'Keran air toilet putri bocor', pelapor: 'Nadia K.', lokasi: 'Toilet Putri', tgl: '2 Apr', urgensi: 'Sedang', status: 'Selesai', badge: 'bg-yellow-100 text-warning', badge2: 'bg-green-100 text-success' },
    { no: '#041', title: 'AC kelas 10A meneteskan air', pelapor: 'Bpk. Hendra', lokasi: 'Kelas 10A', tgl: '1 Apr', urgensi: 'Kritis', status: 'Menunggu', badge: 'bg-red-100 text-danger', badge2: 'bg-blue-100 text-info' },
    { no: '#040', title: 'Kaca jendela kelas 9A retak', pelapor: 'Dewi R.', lokasi: 'Kelas 9A', tgl: '30 Mar', urgensi: 'Sedang', status: 'Selesai', badge: 'bg-yellow-100 text-warning', badge2: 'bg-green-100 text-success' },
  ];

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex gap-1.5 mb-3.25">
        {filters.map((f, idx) => (
          <button
            key={idx}
            onClick={() => setFilter(idx)}
            className={`mono text-[9px] tracking-wider uppercase px-3 py-1.25 rounded border transition-colors ${
              filter === idx
                ? 'bg-ink text-paper border-ink'
                : 'bg-transparent text-ink-3 border-gray-200/60 hover:bg-paper-2'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-paper border border-gray-200/60 rounded overflow-hidden">
        <div className="px-4 py-2.75 border-b border-gray-100/60 flex justify-between items-center">
          <span className="text-xs font-medium">Semua laporan masuk</span>
          <span className="mono text-[9px] text-ink-3">47 laporan</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-paper-2">
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">No.</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Judul Kerusakan</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Pelapor</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Lokasi</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Tgl</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Urgensi</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Status</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx} className="border-t border-gray-100/60 hover:bg-paper-2">
                <td className="px-3.5 py-2 mono text-[10px] text-ink-3">{report.no}</td>
                <td className="px-3.5 py-2 font-medium text-ink">{report.title}</td>
                <td className="px-3.5 py-2 text-ink-2">{report.pelapor}</td>
                <td className="px-3.5 py-2 text-ink-2">{report.lokasi}</td>
                <td className="px-3.5 py-2 mono text-[10px] text-ink-3">{report.tgl}</td>
                <td className="px-3.5 py-2">
                  <span className={`badge ${report.badge}`}>{report.urgensi}</span>
                </td>
                <td className="px-3.5 py-2">
                  <span className={`badge ${report.badge2}`}>{report.status}</span>
                </td>
                <td className="px-3.5 py-2">
                  <div className="flex gap-1">
                    {report.status === 'Menunggu' && (
                      <>
                        <button className="text-[11px] px-2 py-1 bg-ink text-paper rounded hover:bg-ink-2 transition-colors">
                          Tugaskan
                        </button>
                        <button className="text-[11px] px-2 py-1 border border-gray-200/60 rounded hover:bg-paper-2 transition-colors">
                          Tolak
                        </button>
                      </>
                    )}
                    {report.status === 'Proses' && (
                      <button className="text-[11px] px-2 py-1 border border-red-100 bg-red-50 text-accent rounded hover:bg-red-100 transition-colors">
                        Detail
                      </button>
                    )}
                    {report.status === 'Selesai' && (
                      <button className="text-[11px] px-2 py-1 border border-gray-200/60 rounded hover:bg-paper-2 transition-colors">
                        Detail
                      </button>
                    )}
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

export default LaporanMasuk;
