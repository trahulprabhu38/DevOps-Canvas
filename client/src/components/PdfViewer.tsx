import React from 'react';
import { PdfNote } from '@/services/api';

interface PdfViewerProps {
  pdfNote: PdfNote;
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfNote, onClose }) => {
  const pdfUrl = pdfNote.pdfUrl.startsWith('http')
    ? pdfNote.pdfUrl
    : `http://localhost:3001${pdfNote.pdfUrl}`;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Close Button - Top Right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
        aria-label="Close PDF viewer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* PDF Title - Top Left */}
      <div className="absolute top-4 left-4 z-50 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
        <h2 className="text-white font-semibold text-lg">{pdfNote.title}</h2>
      </div>

      {/* PDF Container - Fullscreen */}
      <div className="w-full h-full">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          title={pdfNote.title}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
