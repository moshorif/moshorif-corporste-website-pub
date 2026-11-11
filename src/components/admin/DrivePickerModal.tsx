import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Cloud,
  Folder,
  FileText,
  Image as ImageIcon,
  Check,
  ExternalLink,
  Loader2,
  HardDrive,
} from 'lucide-react';
import {
  DriveFileItem,
  formatDriveFileSize,
  getDriveMediaType,
  PORTFOLIO_DRIVE_FOLDER_ID,
  PORTFOLIO_DRIVE_URL,
} from '../../utils/drive';
import { listGoogleDriveFiles } from '../../services/googleDriveApi';
import { getAccessToken, googleSignIn } from '../../services/googleDriveAuth';

interface DrivePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (file: DriveFileItem) => void;
  title?: string;
  allowedTypes?: 'all' | 'images' | 'documents';
}

export const DrivePickerModal: React.FC<DrivePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectFile,
  title = 'Select File from Google Drive',
  allowedTypes = 'all',
}) => {
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'images' | 'documents'>(allowedTypes);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [activeFolder, setActiveFolder] = useState<string>(PORTFOLIO_DRIVE_FOLDER_ID);

  useEffect(() => {
    if (!isOpen) return;

    const checkAuthAndLoad = async () => {
      const token = await getAccessToken();
      setIsAuthenticated(!!token);
      loadFiles(activeFolder, typeFilter, search);
    };

    checkAuthAndLoad();
  }, [isOpen, activeFolder, typeFilter]);

  const loadFiles = async (
    folderId: string,
    filter: 'all' | 'images' | 'documents',
    query: string
  ) => {
    setLoading(true);
    try {
      const res = await listGoogleDriveFiles({
        folderId,
        typeFilter: filter,
        searchQuery: query,
      });
      setFiles(res.files);
    } catch (err) {
      console.error('Error loading files for picker:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadFiles(activeFolder, typeFilter, search);
  };

  const handleConnectGoogle = async () => {
    setIsSigningIn(true);
    try {
      const res = await googleSignIn();
      if (res?.accessToken) {
        setIsAuthenticated(true);
        loadFiles(activeFolder, typeFilter, search);
      }
    } catch (e) {
      console.error('Failed to sign in:', e);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (!isOpen) return null;

  const selectedFile = files.find((f) => f.id === selectedFileId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2271b1]/10 flex items-center justify-center text-[#2271b1]">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">{title}</h3>
              <p className="text-xs text-slate-500">
                Pick proof screenshots, case study visuals, or documents directly from Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between bg-white">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Drive files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
            />
          </form>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex gap-1 bg-slate-100 p-1 rounded">
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                  typeFilter === 'all'
                    ? 'bg-white text-slate-800 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('images')}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                  typeFilter === 'images'
                    ? 'bg-white text-slate-800 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Images
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('documents')}
                className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                  typeFilter === 'documents'
                    ? 'bg-white text-slate-800 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                PDFs
              </button>
            </div>

            {!isAuthenticated && (
              <button
                type="button"
                onClick={handleConnectGoogle}
                disabled={isSigningIn}
                className="text-xs px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-900 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isSigningIn ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Cloud className="w-3.5 h-3.5 text-[#4285F4]" />
                )}
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>

        {/* Files Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 min-h-[320px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#2271b1] mb-2" />
              <p className="text-xs">Fetching Google Drive files...</p>
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <Folder className="w-12 h-12 text-slate-300 mb-2" />
              <p className="text-sm font-medium">No files found</p>
              <p className="text-xs text-slate-400">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {files.map((file) => {
                const isSelected = file.id === selectedFileId;
                const mediaType = getDriveMediaType(file.mimeType);

                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFileId(file.id)}
                    className={`group relative rounded-lg border p-2 flex flex-col justify-between transition-all cursor-pointer bg-white ${
                      isSelected
                        ? 'border-[#2271b1] ring-2 ring-[#2271b1]/30 bg-blue-50/20'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Checkmark badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#2271b1] text-white flex items-center justify-center shadow-xs z-10">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}

                    {/* Thumbnail / Icon preview */}
                    <div className="w-full h-28 rounded bg-slate-100 flex items-center justify-center overflow-hidden mb-2 relative">
                      {file.thumbnailLink ? (
                        <img
                          src={file.thumbnailLink}
                          alt={file.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : mediaType === 'image' ? (
                        <ImageIcon className="w-8 h-8 text-blue-400" />
                      ) : (
                        <FileText className="w-8 h-8 text-amber-500" />
                      )}
                      <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white uppercase tracking-wider">
                        {mediaType}
                      </span>
                    </div>

                    {/* Name & size */}
                    <div>
                      <h4
                        className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-[#2271b1]"
                        title={file.name}
                      >
                        {file.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {formatDriveFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3 border-t border-slate-200 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500 truncate max-w-sm">
            {selectedFile ? (
              <span className="font-medium text-slate-800">
                Selected: <span className="text-[#2271b1]">{selectedFile.name}</span>
              </span>
            ) : (
              'Click a file to select it'
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedFile}
              onClick={() => {
                if (selectedFile) {
                  onSelectFile(selectedFile);
                  onClose();
                }
              }}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2271b1] hover:bg-[#135e96] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors shadow-2xs"
            >
              Insert Selected File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
