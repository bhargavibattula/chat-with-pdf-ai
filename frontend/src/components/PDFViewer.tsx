import React from 'react';
import { ChevronLeft, ZoomIn, ZoomOut, Download, MoreVertical, FileText } from 'lucide-react';

interface PDFViewerProps {
  fileName: string;
  onBack: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileName, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-100/50">
      {/* Viewer Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 transition-shadow">
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
          <div className="flex bg-gray-100 p-1 rounded-lg mr-2">
            <button className="p-1.5 hover:bg-white hover:shadow-sm rounded transition-all text-gray-600">
              <ZoomOut size={16} />
            </button>
            <span className="px-2 flex items-center text-xs font-semibold text-gray-600 min-w-[50px] justify-center">100%</span>
            <button className="p-1.5 hover:bg-white hover:shadow-sm rounded transition-all text-gray-600">
              <ZoomIn size={16} />
            </button>
          </div>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <Download size={18} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* PDF Content Mock */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center custom-scrollbar">
        <div className="w-full max-w-4xl space-y-8">
          {/* Mock Page 1 */}
          <div className="bg-white premium-shadow-lg rounded-sm aspect-[1/1.41] p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
            <div className="space-y-6">
              <div className="h-4 bg-blue-50 w-24 rounded"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-100 w-3/4 rounded-md"></div>
                <div className="h-10 bg-gray-100 w-1/2 rounded-md"></div>
              </div>
              <div className="pt-8 space-y-4">
                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                  <div key={i} className={`h-4 bg-gray-50 rounded ${i % 3 === 0 ? 'w-2/3' : 'w-full'}`}></div>
                ))}
              </div>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="h-40 bg-gray-50 rounded-xl border border-gray-100 border-dashed"></div>
                <div className="h-40 bg-gray-50 rounded-xl border border-gray-100 border-dashed"></div>
              </div>
               <div className="pt-4 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-4 bg-gray-50 rounded ${i % 2 === 0 ? 'w-5/6' : 'w-full'}`}></div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-8 right-8 text-xs text-gray-300 font-medium tracking-widest uppercase">Page 1</div>
          </div>

          {/* Mock Page 2 */}
          <div className="bg-white premium-shadow-lg rounded-sm aspect-[1/1.41] p-16 relative">
            <div className="space-y-6">
              <div className="h-10 bg-gray-100 w-2/3 rounded-md"></div>
              <div className="pt-4 space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                  <div key={i} className={`h-4 bg-gray-50 rounded ${i % 4 === 0 ? 'w-3/4' : 'w-full'}`}></div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-8 right-8 text-xs text-gray-300 font-medium tracking-widest uppercase">Page 2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
