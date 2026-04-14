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
