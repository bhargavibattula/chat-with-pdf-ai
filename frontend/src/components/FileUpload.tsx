import React, { useState, useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const clearFile = () => setSelectedFile(null);

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {!selectedFile ? (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center w-full h-64 
            border-2 border-dashed rounded-2xl cursor-pointer
            transition-all duration-300 ease-in-out
            ${isDragging 
              ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
              : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'}
          `}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <motion.div
              animate={{ y: isDragging ? -10 : 0 }}
              className="p-4 bg-blue-50 rounded-full mb-4"
            >
              <Upload className="w-8 h-8 text-blue-600" />
            </motion.div>
            <p className="mb-2 text-lg font-semibold text-gray-700">
              Drop your PDF here
            </p>
            <p className="text-sm text-gray-500">
              or <span className="text-blue-600 font-medium">click to upload</span>
            </p>
            <p className="mt-4 text-xs text-gray-400 font-medium uppercase tracking-wider">
              Maximum file size: 50MB
            </p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept=".pdf" 
            onChange={handleFileSelect}
          />
        </label>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-white border border-gray-200 rounded-2xl premium-shadow-lg"
        >
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={clearFile}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all premium-shadow flex items-center justify-center space-x-2 active:scale-[0.98]"
          >
            <span>Process Document</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
