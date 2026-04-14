import React from 'react';
import { ChevronLeft, Download, MoreVertical, FileText } from 'lucide-react';

interface PDFViewerProps {
  fileName: string;
  pdfUrl: string | null;
  onBack: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileName, pdfUrl, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-100/50">
      {/* Viewer Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 transition-shadow z-10">
        <div className="flex items-center space-x-3 overflow-hidden">
          <button 
            onClick={onBack}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center space-x-2 overflow-hidden">
            <FileText className="text-blue-600 shrink-0" size={18} />
            <span className="font-semibold text-gray-900 truncate text-sm">
              {fileName}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <Download size={18} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* PDF Content */}
      <div className="flex-1 bg-gray-200/30 relative">
        {pdfUrl ? (
          <iframe 
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full border-none"
            title="PDF Preview"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
             <FileText size={48} strokeWidth={1} />
             <p className="font-medium">No document loaded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;
