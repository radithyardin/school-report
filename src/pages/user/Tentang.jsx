import { Monitor, Home, Lightbulb, Lock, Circle, Settings, Users, Clock, Check } from 'lucide-react';

const Tentang = () => {
  return (
    <div className="max-w-[720px] mx-auto p-10">
      <h1 className="serif text-4xl font-black text-ink leading-tight mb-4">
        Tentang<br /><em className="not-italic text-accent">FasilKu</em>
      </h1>
      <p className="text-sm text-ink-2 leading-relaxed font-light mb-4">
        FasilKu adalah platform digital yang dirancang untuk memudahkan seluruh warga sekolah — siswa, guru, dan staf — dalam melaporkan kerusakan fasilitas secara cepat, transparan, dan terstruktur.
      </p>
      <p className="text-sm text-ink-2 leading-relaxed font-light mb-6">
        Platform ini lahir dari kebutuhan nyata: banyak kerusakan fasilitas sekolah yang lambat ditangani karena tidak ada saluran pelaporan yang efektif. FasilKu hadir sebagai solusi sederhana namun berdampak besar.
      </p>

      <hr className="border-gray-200/60 my-6" />

      {/* Steps */}
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <div className="serif text-5xl font-black text-paper-3 leading-none flex-shrink-0 w-[60px]">01</div>
          <div>
            <div className="text-sm font-medium text-ink mb-1">Laporkan dengan mudah</div>
            <div className="text-xs text-ink-3 leading-relaxed">Isi form singkat, pilih kategori, tambahkan foto, dan laporan langsung terkirim ke admin.</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="serif text-5xl font-black text-paper-3 leading-none flex-shrink-0 w-[60px]">02</div>
          <div>
            <div className="text-sm font-medium text-ink mb-1">Pantau secara real-time</div>
            <div className="text-xs text-ink-3 leading-relaxed">Setiap laporan punya nomor unik. Lacak status perbaikan kapan saja via halaman Status.</div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="serif text-5xl font-black text-paper-3 leading-none flex-shrink-0 w-[60px]">03</div>
          <div>
            <div className="text-sm font-medium text-ink mb-1">Transparan dan akuntabel</div>
            <div className="text-xs text-ink-3 leading-relaxed">Seluruh riwayat tindakan tercatat dan bisa dipantau oleh pelapor maupun admin.</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-px bg-gray-200/60 border border-gray-200/60 rounded overflow-hidden mt-7">
        <div className="bg-paper p-5">
          <div className="serif text-3xl font-black text-accent mb-1">47</div>
          <div className="text-xs font-medium text-ink">Total laporan masuk</div>
          <div className="text-[10px] text-ink-3 mt-1">Selama platform beroperasi</div>
        </div>
        <div className="bg-paper p-5">
          <div className="serif text-3xl font-black text-accent mb-1">27</div>
          <div className="text-xs font-medium text-ink">Berhasil diperbaiki</div>
          <div className="text-[10px] text-ink-3 mt-1">Tingkat penyelesaian 57%</div>
        </div>
        <div className="bg-paper p-5">
          <div className="serif text-3xl font-black text-accent mb-1">3.2</div>
          <div className="text-xs font-medium text-ink">Hari rata-rata penanganan</div>
          <div className="text-[10px] text-ink-3 mt-1">Dari laporan hingga selesai</div>
        </div>
      </div>
    </div>
  );
};

export default Tentang;
