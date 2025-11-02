// components/YouTubeVideoSimulator.tsx

'use client';

import { useEffect, useState } from 'react';
import {ThumbsUp, ThumbsDown, Forward, Share} from "lucide-react";

export default function YouTubeVideoSimulator() {
  const [views, setViews] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Simulación de aumento de vistas cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setViews((prev) => prev + Math.floor(Math.random() * 5) + 1); // +1 a +5 views/seg
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Formateador de números (123456 → "123K")
  const formatViews = (num: number): string => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  const handleDownloadClick = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert('✅ Descarga iniciada!');
    }, 1500);
  };

  // Datos de videos relacionados con seeds únicos
  const relatedVideos = [
    { id: 1, title: '[4K] Nature & Landscapes | Drone Aerial View Free H...', channel: 'Free HD videos - no copy...', duration: '7:17' },
    { id: 2, title: 'ALIMENTOS QUE NO NECESITAS EN TU DIETA FITNESS', channel: 'Health Fitness', duration: '20:05' },
    { id: 3, title: 'ATRACIONES EN EL FITNESS', channel: 'Helen Fitness Recommended for you', duration: '31:25' },
  ];

  return (
    <div className="bg-white shadow-lg p-4 max-w-[600px] mx-auto font-sans">
      {/* Video Preview */}
      <div className="relative w-full pb-[56.25%] bg-black rounded-xl overflow-hidden mb-3">
        <img
          src="https://picsum.photos/seed/main/400/400.webp"
          alt="Video preview"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-60 px-2 py-1 rounded">
          7:17
        </div>
      </div>

      {/* Title & Channel Info */}
      <div className="mb-3">
        <h2 className="font-bold text-sm line-clamp-2">
          2K ROYALTY FREE NON-COPYRIGHTED VIDEOS
        </h2>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                    src="/instagram/1.webp"
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                />
            </div>
            <span className="text-xs font-medium">Libar Marti</span>
          </div>
          <span className="text-xs text-gray-500">{formatViews(views)} visualizaciones</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex space-x-4">
          <button className="text-gray-600 text-xs flex items-center space-x-1">
            <span><ThumbsUp /></span>
            <span>201</span>
          </button>
          <button className="text-gray-600 text-xs flex items-center space-x-1">
            <span><ThumbsDown /></span>
            <span>7</span>
          </button>
          <button className="text-gray-600 text-xs flex items-center space-x-1">
            <span><Forward /></span>
            <span>25</span>
          </button>
          <button className="text-gray-600 text-xs flex items-center space-x-1">
            <span><Share /></span>
            <span>9</span>
          </button>
        </div>
        <button
          onClick={handleDownloadClick}
          disabled={isDownloading}
          className={`px-3 py-1 text-xs font-medium rounded ${
            isDownloading
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isDownloading ? 'Descargando...' : 'Descargar'}
        </button>
      </div>

      {/* Subscribe Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
        </div>
        <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100">
          SUSCRIBIRSE
        </button>
      </div>

      {/* Autoplay Toggle */}
      <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
        <span>Reproducción automática</span>
        <div className="w-10 h-5 bg-blue-500 rounded-full relative">
          <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
        </div>
      </div>

      {/* Related Videos */}
      <div className="space-y-3">
        {relatedVideos.map((video) => (
          <div key={video.id} className="flex space-x-3">
            <img
              src={`https://picsum.photos/seed/${video.id}/400/400.webp`}
              alt={video.title}
              className="w-20 h-12 rounded object-cover flex-shrink-0"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-medium line-clamp-2">{video.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{video.channel}</p>
              <p className="text-xs text-gray-500">{video.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
