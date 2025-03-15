import React from 'react';
import { FileCheck , Upload, CheckCircle , X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// Reusable FileUpload component
const FileUpload = ({ id, label, file, setFile, accept = "image/*,.pdf" }) => {
    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
      }
    };
  
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div 
            className="relative flex-1 bg-black/60 border border-slate-700/50 rounded-md h-11 overflow-hidden"
            onClick={() => document.getElementById(id)?.click()}
          >
            <div className="flex items-center h-full px-3 cursor-pointer">
              {file ? (
                <p className="text-white truncate">{file.name}</p>
              ) : (
                <span className="text-slate-500">{label}</span>
              )}
            </div>
            {file && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            type="button"
            onClick={() => document.getElementById(id)?.click()}
            className="h-11 px-3 bg-gradient-to-r from-cyan-400 via-violet-500 to-amber-400 text-white transition-all hover:scale-105"
          >
            {file ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </Button>
          <input
            id={id}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept={accept}
          />
        </div>
        {file && (
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <FileCheck className="w-4 h-4" />
            <span>File uploaded successfully</span>
          </div>
        )}
      </div>
    );
  };
export default FileUpload;