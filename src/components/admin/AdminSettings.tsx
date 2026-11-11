import React, { useState, useRef } from 'react';
import {
  Database,
  FileDown,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminSettings: React.FC = () => {
  const { exportBackup, importBackup, resetToDefault } = usePortfolio();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    const jsonStr = exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `msi-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedback({ type: 'success', text: 'Backup JSON downloaded successfully.' });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importBackup(content);
      if (res.success) {
        setFeedback({
          type: 'success',
          text: 'Backup restored successfully! All sections updated.',
        });
      } else {
        setFeedback({
          type: 'error',
          text: res.error || 'Failed to import backup payload.',
        });
      }
      setTimeout(() => setFeedback(null), 5000);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    if (
      confirm(
        'Are you sure you want to restore the official verified portfolio dataset? Any custom edits will be replaced.'
      )
    ) {
      resetToDefault();
      setFeedback({
        type: 'success',
        text: 'Website successfully restored to verified employment & case study records!',
      });
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#14263D] flex items-center gap-2">
            <Database className="w-5 h-5 text-[#2271b1]" />
            <span>Data Sync, Backup & System Settings</span>
          </h2>
          <p className="text-xs text-[#657386] mt-1">
            Export JSON backups, restore historical snapshots, or reset to original verified records.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-lg text-xs font-semibold flex items-center gap-2 animate-fadeIn ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-[#20A37A]" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Backup & Restore Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export JSON */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2271b1] flex items-center justify-center mb-3">
              <FileDown className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#14263D]">
              Export Full Portfolio Snapshot
            </h3>
            <p className="text-xs text-[#657386] mt-1 leading-relaxed">
              Download your complete portfolio configuration (all 5 case studies, metrics, experiences, skills, and received inquiries) as a single JSON file.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer self-start"
          >
            <FileDown className="w-4 h-4" />
            <span>Download JSON Backup</span>
          </button>
        </div>

        {/* Import JSON */}
        <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#20A37A] flex items-center justify-center mb-3">
              <Upload className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#14263D]">
              Restore From JSON Backup
            </h3>
            <p className="text-xs text-[#657386] mt-1 leading-relaxed">
              Upload a previously exported backup file to restore website content, case studies, or lead history across environments.
            </p>
          </div>

          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#F4F6F8] hover:bg-[#E2E7ED] text-[#14263D] border border-[#E2E7ED] text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Backup File</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset to Factory / Verified Baseline */}
      <div className="bg-white p-6 rounded-xl border border-[#E2E7ED] shadow-2xs space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#14263D]">
              Restore Verified Baseline Data
            </h3>
            <p className="text-xs text-[#657386] leading-relaxed max-w-2xl">
              Reset all personal information, LensCart Bangladesh & Niloy Motors experience items, Google Drive proof links, and the 5 master case studies to their original verified state.
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-white border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Verified Defaults</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
