import { useState, useEffect } from 'react';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-editorial-bg flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="font-serif text-5xl font-bold text-editorial-text mb-2">
          School<span className="text-editorial-accent">Fasilita</span>
        </h1>
        <p className="text-editorial-muted mb-8">Sistem Pelaporan Fasilitas Sekolah</p>
        
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-editorial-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-4 text-sm text-editorial-muted">{progress}%</p>
      </div>
    </div>
  );
};

export default Preloader;
