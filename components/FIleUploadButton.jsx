import React from 'react'; 
import { FileCheck, Upload, CheckCircle, X, Info } from "lucide-react"; 
import { Button } from "@/components/ui/button";  

// Responsive FileUpload component optimized for all devices
const FileUpload = ({ id, label, file, setFile, accept = "image/*,.pdf" }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
    
  return (
    <div className="space-y-3 w-full">
      
      
      {/* Main upload container */}
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        {/* File display area */}
        <div
          className="relative flex-1 bg-black/60 border border-slate-700/50 rounded-md h-12 overflow-hidden cursor-pointer"
          onClick={() => document.getElementById(id)?.click()}
        >
          <div className="flex items-center h-full px-3">
            {file ? (
              <p className="text-white truncate text-sm sm:text-base">{file.name} *</p>
            ) : (
              <span className="text-slate-500 text-sm sm:text-base">{label} *</span>
            )}
          </div>
          {file && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white p-1"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Upload button */}
        <Button
          type="button"
          onClick={() => document.getElementById(id)?.click()}
          className="group relative p-2 h-12 rounded-lg text-base font-bold transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 transition-all duration-300 group-hover:blur-md"></div>
          <div className="absolute inset-0.5 bg-black rounded-lg"></div>
          <span className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-transparent bg-clip-text whitespace-nowrap">
            {file ? "Replace File" : "Upload File"}
            {file ? (
              <CheckCircle className="w-4 h-4 text-cyan-400 transition-transform duration-300" />
            ) : (
              <Upload className="w-4 h-4 text-cyan-400 transition-transform duration-300" />
            )}
          </span>
        </Button>
        
        {/* Hidden file input */}
        <input
          id={id}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept={accept}
        />
      </div>
      
      {/* Success message */}
      {file && (
        <div className="flex items-center gap-2 text-sm text-emerald-400">
          <FileCheck className="w-4 h-4" />
          <span>File uploaded successfully</span>
        </div>
      )}
      
      {/* Mobile drag and drop area */}
      
    </div>
  );
}; 

export default FileUpload;