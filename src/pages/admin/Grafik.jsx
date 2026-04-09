import { useState, useEffect, useRef } from 'react';
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

const Grafik = () => {
  // Line chart data
  const lineData = {
    labels: ['Mg1', 'Mg2', 'Mg3', 'Mg4', 'Mg5', 'Mg6', 'Mg7', 'Mg8'],
    datasets: [
      {
        label: 'Laporan',
        data: [3, 5, 4, 8, 6, 7, 5, 9],
        borderColor: '#1a1814',
        backgroundColor: 'rgba(26,24,20,0.07)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#1a1814',
        borderWidth: 2,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#7a776f' } },
      y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10 }, color: '#7a776f' }, beginAtZero: true },
    },
  };

  // Donut 1 - Status
  const donut1Data = {
    labels: ['Menunggu', 'Proses', 'Selesai'],
    datasets: [{
      data: [12, 8, 27],
      backgroundColor: ['#a82424', '#c87a00', '#2d6a2d'],
      borderWidth: 0,
      hoverOffset: 4,
    }],
  };

  const donut1Options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { position: 'bottom', labels: { font: { size: 10 }, color: '#7a776f', padding: 10, boxWidth: 9 } }
    },
    cutout: '58%',
  };

  // Horizontal bar - Kategori
  const hbarData = {
    labels: ['Elektronik', 'Bangunan', 'Listrik', 'Toilet', 'Keamanan', 'Lainnya'],
    datasets: [{
      data: [14, 9, 7, 6, 5, 6],
      backgroundColor: '#1a1814',
      borderRadius: 2,
      barPercentage: 0.55,
    }],
  };

  const hbarOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10 }, color: '#7a776f' }, beginAtZero: true },
      y: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#7a776f' } },
    },
  };

  // Bar chart - Waktu penanganan
  const timeData = {
    labels: ['Elektronik', 'Bangunan', 'Listrik', 'Toilet', 'Keamanan'],
    datasets: [{
      data: [4.2, 6.1, 2.8, 3.5, 5.0],
      backgroundColor: ['#1a4a7a', '#c87a00', '#2d6a2d', '#a82424', '#7a776f'],
      borderRadius: 2,
      barPercentage: 0.55,
    }],
  };

  const timeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#7a776f' } },
      y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10 }, color: '#7a776f' }, beginAtZero: true },
    },
  };

  return (
    <div>
      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-3.5 mb-3.5">
        {/* Line Chart */}
        <div className="bg-paper border border-gray-200/60 rounded overflow-hidden">
          <div className="px-4 py-2.75 border-b border-gray-100/60 flex justify-between items-center">
            <span className="text-xs font-medium">Laporan per minggu</span>
            <span className="mono text-[9px] text-ink-3">8 minggu terakhir</span>
          </div>
          <div className="p-4" style={{ height: '180px' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Donut Chart - Status */}
        <div className="bg-paper border border-gray-200/60 rounded overflow-hidden">
          <div className="px-4 py-2.75 border-b border-gray-100/60">
            <span className="text-xs font-medium">Status laporan</span>
          </div>
          <div className="p-4" style={{ height: '180px' }}>
            <Doughnut data={donut1Data} options={donut1Options} />
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Horizontal Bar - Kategori */}
        <div className="bg-paper border border-gray-200/60 rounded overflow-hidden">
          <div className="px-4 py-2.75 border-b border-gray-100/60">
            <span className="text-xs font-medium">Laporan per kategori</span>
          </div>
          <div className="p-4" style={{ height: '180px' }}>
            <Bar data={hbarData} options={hbarOptions} />
          </div>
        </div>

        {/* Bar Chart - Waktu */}
        <div className="bg-paper border border-gray-200/60 rounded overflow-hidden">
          <div className="px-4 py-2.75 border-b border-gray-100/60">
            <span className="text-xs font-medium">Rata-rata waktu penanganan (hari)</span>
          </div>
          <div className="p-4" style={{ height: '180px' }}>
            <Bar data={timeData} options={timeOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grafik;
