import React, { useState, useEffect, useRef } from 'react';
import {
  Cloud,
  Search,
  Upload,
  FolderPlus,
  RefreshCw,
  LayoutGrid,
  List,
  ExternalLink,
  Copy,
  Trash2,
  Check,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Folder,
  Table as TableIcon,
  FileArchive,
  Film,
  File,
  Loader2,
  HardDrive,
  LogOut,
  Sparkles,
  Link2,
} from 'lucide-react';
import {
  DriveFileItem,
  formatDriveFileSize,
  getDriveMediaType,
  PORTFOLIO_DRIVE_FOLDER_ID,
  PORTFOLIO_DRIVE_URL,
} from '../../utils/drive';
import {
  listGoogleDriveFiles,
  uploadGoogleDriveFile,
  createGoogleDriveFolder,
  deleteGoogleDriveFile,
  getGoogleDriveQuota,
  DriveQuotaResponse,
} from '../../services/googleDriveApi';
import {
  subscribeAuth,
  googleSignIn,
  googleSignOut,
  getCurrentUser,
  getAccessToken,
} from '../../services/googleDriveAuth';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminDriveMedia: React.FC = () => {
  const { data, updateCaseStudy } = usePortfolio();

  // Auth & Connection State
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [token, setToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [quota, setQuota] = useState<DriveQuotaResponse | null>(null);

  // Drive Navigation & Files State
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFolderId, setActiveFolderId] = useState<string>(PORTFOLIO_DRIVE_FOLDER_ID);
  const [folderHistory, setFolderHistory] = useState<{ id: string; name: string }[]>([
    { id: PORTFOLIO_DRIVE_FOLDER_ID, name: "Mohammad's Portfolio Folder" },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'images' | 'documents' | 'folders' | 'spreadsheets'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Upload & Folder Creation Modals
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // Destructive Action: Mandatory Confirmation Dialog State
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Attach to Case Study Modal
  const [fileToAttach, setFileToAttach] = useState<DriveFileItem | null>(null);
  const [targetCaseStudyId, setTargetCaseStudyId] = useState<string>(data.caseStudies[0]?.id || '');
  const [attachAsType, setAttachAsType] = useState<'visual' | 'driveLink'>('visual');

  // Preview Modal
  const [previewFile, setPreviewFile] = useState<DriveFileItem | null>(null);

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = subscribeAuth(async (user, authToken) => {
      setCurrentUser(user);
      setToken(authToken);
      if (authToken) {
        getGoogleDriveQuota().then(setQuota);
      } else {
        setQuota(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch files whenever folder, filter, search, or auth token changes
  useEffect(() => {
    loadFiles();
  }, [activeFolderId, typeFilter, token]);

  const loadFiles = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await listGoogleDriveFiles({
        folderId: activeFolderId,
        typeFilter,
        searchQuery,
      });
      setFiles(res.files);
    } catch (err: any) {
      console.error('Failed to list files:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Unable to load Google Drive files.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadFiles();
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setStatusMessage({
          type: 'success',
          text: `Connected to Google Drive as ${res.user.email}!`,
        });
        loadFiles();
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Google Sign-in failed. Please try again.',
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await googleSignOut();
    setStatusMessage({
      type: 'success',
      text: 'Disconnected Google Drive account.',
    });
    loadFiles();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (!token) {
      setStatusMessage({
        type: 'error',
        text: 'Please connect your Google Account before uploading files to Google Drive.',
      });
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);
    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        await uploadGoogleDriveFile(selectedFiles[i], activeFolderId);
      }
      setStatusMessage({
        type: 'success',
        text: `Successfully uploaded ${selectedFiles.length} file(s) to Google Drive!`,
      });
      loadFiles();
    } catch (err: any) {
      console.error('Upload failed:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to upload file to Google Drive.',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    if (!token) {
      setStatusMessage({
        type: 'error',
        text: 'Please sign in with Google to create folders.',
      });
      return;
    }

    setIsCreatingFolder(true);
    try {
      await createGoogleDriveFolder(newFolderName.trim(), activeFolderId);
      setShowNewFolderModal(false);
      setNewFolderName('');
      setStatusMessage({
        type: 'success',
        text: `Created folder "${newFolderName}" in Google Drive.`,
      });
      loadFiles();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to create folder.',
      });
    } finally {
      setIsCreatingFolder(false);
    }
  };

  // MANDATORY USER CONFIRMATION FOR DESTRUCTIVE ACTION
  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteGoogleDriveFile(fileToDelete.id);
      setStatusMessage({
        type: 'success',
        text: `Successfully removed "${fileToDelete.name}" from Google Drive.`,
      });
      setFileToDelete(null);
      loadFiles();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Failed to delete file from Google Drive.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Attach selected file to Case Study
  const handleAttachToCaseStudy = () => {
    if (!fileToAttach || !targetCaseStudyId) return;

    const targetProject = data.caseStudies.find((c) => c.id === targetCaseStudyId);
    if (!targetProject) return;

    if (attachAsType === 'driveLink') {
      const link = fileToAttach.webViewLink || PORTFOLIO_DRIVE_URL;
      updateCaseStudy(targetCaseStudyId, { driveLink: link });
      setStatusMessage({
        type: 'success',
        text: `Set Google Drive proof link on case study "${targetProject.title}".`,
      });
    } else {
      const fileUrl =
        fileToAttach.thumbnailLink ||
        fileToAttach.webViewLink ||
        PORTFOLIO_DRIVE_URL;

      const newVisual = {
        url: fileUrl,
        caption: fileToAttach.name.replace(/\.[^/.]+$/, ''),
        type: 'creative' as const,
        metricsHighlight: 'Verified Google Drive Campaign Asset',
      };

      updateCaseStudy(targetCaseStudyId, {
        visuals: [...targetProject.visuals, newVisual],
      });
      setStatusMessage({
        type: 'success',
        text: `Attached "${fileToAttach.name}" to case study "${targetProject.title}".`,
      });
    }

    setFileToAttach(null);
  };

  const copyToClipboard = (text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setStatusMessage({
      type: 'success',
      text: 'Link copied to clipboard!',
    });
  };

  const navigateToFolder = (folderId: string, folderName: string) => {
    setActiveFolderId(folderId);
    setFolderHistory((prev) => [...prev, { id: folderId, name: folderName }]);
  };

  const navigateToBreadcrumb = (index: number) => {
    const target = folderHistory[index];
    setFolderHistory((prev) => prev.slice(0, index + 1));
    setActiveFolderId(target.id);
  };

  const renderFileIcon = (mimeType: string) => {
    const type = getDriveMediaType(mimeType);
    switch (type) {
      case 'folder':
        return <Folder className="w-5 h-5 text-amber-500 fill-amber-100" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-blue-500" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'spreadsheet':
        return <TableIcon className="w-5 h-5 text-emerald-600" />;
      case 'video':
        return <Film className="w-5 h-5 text-purple-500" />;
      case 'archive':
        return <FileArchive className="w-5 h-5 text-amber-600" />;
      default:
        return <File className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c3c4c7]/40 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#1d2327]">Google Drive Media & Assets</h1>
            <span className="bg-[#4285F4]/10 text-[#4285F4] border border-[#4285F4]/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Workspace Integration
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Browse, manage, and attach verified campaign assets, meta screenshots, and PDF case studies from Google Drive.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={PORTFOLIO_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded shadow-2xs transition-colors"
          >
            <Cloud className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>Open Drive Folder</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {token && (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer"
            >
              {isUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>Upload to Drive</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Status feedback message */}
      {statusMessage && (
        <div
          className={`p-3 rounded-md text-xs font-medium flex items-center justify-between ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Account Connection & Drive Quota Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
              <HardDrive className="w-6 h-6 text-[#4285F4]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-800">
                  {currentUser ? currentUser.displayName || currentUser.email : 'Google Drive Workspace Integration'}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    token
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : 'bg-amber-100 text-amber-700 border border-amber-300'
                  }`}
                >
                  {token ? 'Authenticated' : 'Archive Mode (Sign in for Live Sync)'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentUser
                  ? `Logged in as ${currentUser.email} • Workspace files enabled`
                  : "Browsing Mohammad's verified portfolio Drive folder (103EoiBcdPOwKDAZpHskiAzdixoF8cGmI). Sign in with your Google account to upload or modify files."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            {!token ? (
              /* Official Google Sign In Button */
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded-md shadow-2xs transition-all cursor-pointer"
              >
                {isSigningIn ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#4285F4]" />
                ) : (
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-4 h-4"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                )}
                <span>Sign in with Google</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500" />
                <span>Disconnect</span>
              </button>
            )}
          </div>
        </div>

        {/* Quota details if signed in */}
        {quota && quota.usage && quota.limit && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Google Drive Storage: {formatDriveFileSize(quota.usage)} used of{' '}
              {formatDriveFileSize(quota.limit)}
            </span>
            <div className="w-48 bg-slate-100 rounded-full h-2 overflow-hidden ml-4">
              <div
                className="bg-[#4285F4] h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (parseInt(quota.usage, 10) / parseInt(quota.limit, 10)) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Quick Folder Switcher & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200">
        {/* Breadcrumb nav */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 overflow-x-auto py-1">
          <Cloud className="w-4 h-4 text-[#4285F4] shrink-0" />
          {folderHistory.map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx > 0 && <span className="text-slate-400">/</span>}
              <button
                onClick={() => navigateToBreadcrumb(idx)}
                className={`hover:underline font-medium truncate max-w-[200px] cursor-pointer ${
                  idx === folderHistory.length - 1 ? 'font-bold text-slate-900' : 'text-slate-600'
                }`}
              >
                {item.name}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Folder quick presets */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveFolderId(PORTFOLIO_DRIVE_FOLDER_ID);
              setFolderHistory([{ id: PORTFOLIO_DRIVE_FOLDER_ID, name: "Mohammad's Portfolio Folder" }]);
            }}
            className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
              activeFolderId === PORTFOLIO_DRIVE_FOLDER_ID
                ? 'bg-blue-50 text-[#2271b1] border border-blue-200 font-semibold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Portfolio Drive
          </button>
          {token && (
            <button
              onClick={() => {
                setActiveFolderId('root_all');
                setFolderHistory([{ id: 'root_all', name: 'My Drive (All Files)' }]);
              }}
              className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                activeFolderId === 'root_all'
                  ? 'bg-blue-50 text-[#2271b1] border border-blue-200 font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              My Drive Root
            </button>
          )}
          {token && (
            <button
              onClick={() => setShowNewFolderModal(true)}
              className="text-xs px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium flex items-center gap-1 transition-colors"
            >
              <FolderPlus className="w-3.5 h-3.5 text-amber-600" />
              <span>New Folder</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Drive files by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
          />
        </form>

        <div className="flex items-center gap-2 justify-between md:justify-end">
          {/* Category Tabs */}
          <div className="flex gap-1 bg-white p-1 rounded border border-slate-200 overflow-x-auto">
            {(['all', 'images', 'documents', 'folders', 'spreadsheets'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setTypeFilter(cat)}
                className={`text-xs px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                  typeFilter === cat
                    ? 'bg-[#2271b1] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'all' ? 'All Files' : cat}
              </button>
            ))}
          </div>

          {/* Refresh & View Switcher */}
          <div className="flex items-center gap-1 bg-white p-1 rounded border border-slate-200">
            <button
              onClick={loadFiles}
              title="Refresh Files"
              className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#2271b1]' : ''}`} />
            </button>
            <div className="w-[1px] h-4 bg-slate-200 my-auto" />
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1 rounded ${
                viewMode === 'grid' ? 'bg-slate-100 text-[#2271b1]' : 'text-slate-500'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              title="Table View"
              className={`p-1 rounded ${
                viewMode === 'table' ? 'bg-slate-100 text-[#2271b1]' : 'text-slate-500'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Files Display Section */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#2271b1] mb-2" />
            <p className="text-xs font-medium">Loading Google Drive files...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Cloud className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h4 className="font-semibold text-slate-700 text-sm">No files in this location</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {searchQuery
                ? `No files match query "${searchQuery}". Try clearing search.`
                : 'Upload proof screenshots or create folders to organize your portfolio assets.'}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => {
              const mediaType = getDriveMediaType(file.mimeType);
              const isFolder = mediaType === 'folder';

              return (
                <div
                  key={file.id}
                  className="group bg-slate-50 hover:bg-white rounded-lg border border-slate-200 hover:border-slate-300 p-3 flex flex-col justify-between transition-all hover:shadow-xs relative"
                >
                  {/* Thumbnail / Preview Area */}
                  <div
                    onClick={() => {
                      if (isFolder) {
                        navigateToFolder(file.id, file.name);
                      } else {
                        setPreviewFile(file);
                      }
                    }}
                    className="w-full h-36 rounded bg-slate-100 flex items-center justify-center overflow-hidden mb-2 cursor-pointer relative"
                  >
                    {file.thumbnailLink ? (
                      <img
                        src={file.thumbnailLink}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        {renderFileIcon(file.mimeType)}
                        <span className="text-[10px] text-slate-400 uppercase font-bold">
                          {mediaType}
                        </span>
                      </div>
                    )}

                    <span className="absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white uppercase tracking-wider backdrop-blur-xs">
                      {mediaType}
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="mb-3">
                    <h4
                      className="text-xs font-semibold text-slate-800 line-clamp-2 hover:text-[#2271b1] cursor-pointer"
                      title={file.name}
                      onClick={() => {
                        if (isFolder) navigateToFolder(file.id, file.name);
                        else setPreviewFile(file);
                      }}
                    >
                      {file.name}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                      <span>{formatDriveFileSize(file.size)}</span>
                      <span>
                        {file.modifiedTime
                          ? new Date(file.modifiedTime).toLocaleDateString()
                          : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-1">
                    <button
                      onClick={() => setFileToAttach(file)}
                      title="Attach to Case Study"
                      className="text-xs text-[#2271b1] hover:text-[#135e96] font-semibold flex items-center gap-1 px-1.5 py-1 rounded hover:bg-blue-50 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Attach</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {file.webViewLink && (
                        <a
                          href={file.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open in Google Drive"
                          className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => copyToClipboard(file.webViewLink || PORTFOLIO_DRIVE_URL)}
                        title="Copy Link"
                        className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      {token && (
                        <button
                          onClick={() => setFileToDelete(file)}
                          title="Delete from Google Drive"
                          className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Name</th>
                  <th className="py-2.5 px-4">Type</th>
                  <th className="py-2.5 px-4">Size</th>
                  <th className="py-2.5 px-4">Last Modified</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {files.map((file) => {
                  const mediaType = getDriveMediaType(file.mimeType);
                  const isFolder = mediaType === 'folder';

                  return (
                    <tr key={file.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4 font-medium text-slate-800">
                        <div className="flex items-center gap-2.5">
                          {renderFileIcon(file.mimeType)}
                          <button
                            onClick={() => {
                              if (isFolder) navigateToFolder(file.id, file.name);
                              else setPreviewFile(file);
                            }}
                            className="text-left font-medium hover:text-[#2271b1] hover:underline truncate max-w-sm cursor-pointer"
                          >
                            {file.name}
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 uppercase text-[10px] text-slate-500 font-bold">
                        {mediaType}
                      </td>
                      <td className="py-2.5 px-4 text-slate-500">
                        {formatDriveFileSize(file.size)}
                      </td>
                      <td className="py-2.5 px-4 text-slate-500">
                        {file.modifiedTime
                          ? new Date(file.modifiedTime).toLocaleDateString()
                          : '—'}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setFileToAttach(file)}
                            className="px-2 py-1 text-xs text-[#2271b1] hover:bg-blue-50 font-semibold rounded"
                          >
                            Attach to Case Study
                          </button>
                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => copyToClipboard(file.webViewLink || PORTFOLIO_DRIVE_URL)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          {token && (
                            <button
                              onClick={() => setFileToDelete(file)}
                              className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MANDATORY USER CONFIRMATION MODAL FOR DESTRUCTIVE ACTION (Skill requirement) */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Delete file from Google Drive?
            </h3>
            <p className="text-xs text-slate-600 mt-2">
              Are you sure you want to permanently delete{' '}
              <strong className="text-slate-900 font-semibold">"{fileToDelete.name}"</strong>?
              This action mutates your Google Drive data and cannot be undone.
            </p>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition-colors flex items-center gap-1.5"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Attach to Case Study Modal */}
      {fileToAttach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Attach Drive File to Portfolio</h3>
            <p className="text-xs text-slate-600 mt-1">
              Select which Case Study should display{' '}
              <strong className="text-[#2271b1] font-semibold">{fileToAttach.name}</strong>.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Case Study
                </label>
                <select
                  value={targetCaseStudyId}
                  onChange={(e) => setTargetCaseStudyId(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-2 focus:ring-[#2271b1]"
                >
                  {data.caseStudies.map((cs) => (
                    <option key={cs.id} value={cs.id}>
                      {cs.title} ({cs.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Attachment Mode
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="attachType"
                      checked={attachAsType === 'visual'}
                      onChange={() => setAttachAsType('visual')}
                      className="text-[#2271b1]"
                    />
                    <span>Add as campaign visual screenshot</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="attachType"
                      checked={attachAsType === 'driveLink'}
                      onChange={() => setAttachAsType('driveLink')}
                      className="text-[#2271b1]"
                    />
                    <span>Set as primary Google Drive proof link</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setFileToAttach(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAttachToCaseStudy}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2271b1] hover:bg-[#135e96] rounded shadow-2xs"
              >
                Save Attachment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleCreateFolder}
            className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95"
          >
            <h3 className="text-base font-bold text-slate-900">Create New Folder</h3>
            <p className="text-xs text-slate-500 mt-1">
              Create a new folder in Google Drive at current path.
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Folder Name
              </label>
              <input
                type="text"
                autoFocus
                required
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="e.g. Q4 Google Ads Reports"
                className="w-full p-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-[#2271b1]"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewFolderModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreatingFolder || !newFolderName.trim()}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#2271b1] hover:bg-[#135e96] rounded flex items-center gap-1.5"
              >
                {isCreatingFolder && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Create</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                {renderFileIcon(previewFile.mimeType)}
                <h4 className="text-sm font-bold text-slate-800 truncate max-w-lg">
                  {previewFile.name}
                </h4>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center bg-slate-900/5">
              {previewFile.mimeType.startsWith('image/') ? (
                <img
                  src={previewFile.thumbnailLink || previewFile.webViewLink}
                  alt={previewFile.name}
                  className="max-h-[60vh] max-w-full object-contain rounded shadow-md"
                />
              ) : (
                <div className="text-center py-12">
                  {renderFileIcon(previewFile.mimeType)}
                  <p className="text-sm font-semibold text-slate-700 mt-3">{previewFile.name}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {formatDriveFileSize(previewFile.size)} • {previewFile.mimeType}
                  </p>
                  {previewFile.webViewLink && (
                    <a
                      href={previewFile.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#2271b1] text-white text-xs font-semibold rounded-md hover:bg-[#135e96]"
                    >
                      <span>Open in Google Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-slate-200 bg-white flex justify-between items-center text-xs">
              <span className="text-slate-500">{formatDriveFileSize(previewFile.size)}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setFileToAttach(previewFile);
                    setPreviewFile(null);
                  }}
                  className="px-3 py-1.5 bg-blue-50 text-[#2271b1] hover:bg-blue-100 font-semibold rounded"
                >
                  Attach to Case Study
                </button>
                <button
                  onClick={() => setPreviewFile(null)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
