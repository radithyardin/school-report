const Riwayat = () => {
  // Sample data
  const reports = [
    { no: '#RPT-047', title: 'PC Lab Komputer Unit 7 tidak menyala', lokasi: 'Lab Komputer', tgl: '6 Apr 2026', status: 'Menunggu', badge: 'bg-red-100 text-danger' },
    { no: '#RPT-039', title: 'Proyektor kelas 11 bergaris', lokasi: 'Kelas XI IPA 2', tgl: '28 Mar 2026', status: 'Selesai', badge: 'bg-green-100 text-success' },
    { no: '#RPT-031', title: 'AC kelas tetes air', lokasi: 'Kelas XI IPA 2', tgl: '15 Mar 2026', status: 'Selesai', badge: 'bg-green-100 text-success' },
    { no: '#RPT-022', title: 'Kursi kelas patah 2 unit', lokasi: 'Kelas XI IPA 2', tgl: '2 Mar 2026', status: 'Selesai', badge: 'bg-green-100 text-success' },
  ];

  return (
    <div className="p-9">
      <div className="mb-5">
        <h1 className="serif text-2xl font-bold text-ink mb-1">Riwayat Laporan Saya</h1>
        <p className="text-sm text-ink-3">Seluruh laporan yang pernah Anda buat.</p>
      </div>

      {/* Table */}
      <div className="border border-gray-200/60 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-paper-2">
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">No. Laporan</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Judul Kerusakan</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Lokasi</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Tanggal</th>
              <th className="px-3.5 py-2 text-left mono text-[9px] tracking-wider uppercase text-ink-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx} className="border-t border-gray-100 hover:bg-paper-2">
                <td className="px-3.5 py-2.5 mono text-[10px] text-ink-3">{report.no}</td>
                <td className="px-3.5 py-2.5 font-medium text-ink">{report.title}</td>
                <td className="px-3.5 py-2.5 text-ink-2">{report.lokasi}</td>
                <td className="px-3.5 py-2.5 mono text-[10px] text-ink-3">{report.tgl}</td>
                <td className="px-3.5 py-2.5">
                  <span className={`badge ${report.badge}`}>
                    {report.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Riwayat;
