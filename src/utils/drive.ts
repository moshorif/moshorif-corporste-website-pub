export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  size?: string;
  modifiedTime?: string;
  createdTime?: string;
}

export const PORTFOLIO_DRIVE_FOLDER_ID = '103EoiBcdPOwKDAZpHskiAzdixoF8cGmI';
export const PORTFOLIO_DRIVE_URL =
  'https://drive.google.com/drive/folders/103EoiBcdPOwKDAZpHskiAzdixoF8cGmI?usp=drive_link';

/**
 * Format raw byte size into human readable string (KB, MB, GB)
 */
export function formatDriveFileSize(bytes?: string | number): string {
  if (bytes === undefined || bytes === null || bytes === '') return '—';
  const num = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(num) || num <= 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(num) / Math.log(1024));
  const formatted = (num / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1);
  return `${formatted} ${units[i]}`;
}

/**
 * Identify simplified media category from MIME type
 */
export function getDriveMediaType(
  mimeType: string
): 'image' | 'pdf' | 'document' | 'spreadsheet' | 'folder' | 'video' | 'archive' | 'other' {
  if (!mimeType) return 'other';
  if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType === 'application/pdf') return 'pdf';
  if (
    mimeType.includes('spreadsheet') ||
    mimeType.includes('excel') ||
    mimeType === 'application/vnd.google-apps.spreadsheet'
  ) {
    return 'spreadsheet';
  }
  if (
    mimeType.includes('word') ||
    mimeType.includes('document') ||
    mimeType === 'application/vnd.google-apps.document'
  ) {
    return 'document';
  }
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.includes('zip') || mimeType.includes('tar') || mimeType.includes('compressed')) {
    return 'archive';
  }
  return 'other';
}

/**
 * Parse Google Drive folder or file ID from standard Google Drive URLs
 */
export function extractDriveIdFromUrl(url: string): string | null {
  if (!url) return null;
  // Folders: /folders/<id>
  const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) return folderMatch[1];

  // Files: /d/<id> or id=<id>
  const fileMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) return fileMatch[1];

  const paramMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (paramMatch && paramMatch[1]) return paramMatch[1];

  // Raw ID passed directly (typically 25-45 alphanumeric characters)
  if (/^[a-zA-Z0-9_-]{20,50}$/.test(url.trim())) {
    return url.trim();
  }

  return null;
}

/**
 * Build Google Drive query string for files.list
 */
export function buildDriveQuery(options: {
  folderId?: string;
  searchQuery?: string;
  typeFilter?: 'all' | 'images' | 'documents' | 'folders' | 'spreadsheets';
  includeTrashed?: boolean;
}): string {
  const clauses: string[] = [];

  if (!options.includeTrashed) {
    clauses.push('trashed = false');
  }

  if (options.folderId && options.folderId !== 'root_all') {
    clauses.push(`'${options.folderId}' in parents`);
  }

  if (options.typeFilter && options.typeFilter !== 'all') {
    switch (options.typeFilter) {
      case 'images':
        clauses.push("mimeType contains 'image/'");
        break;
      case 'documents':
        clauses.push(
          "(mimeType = 'application/pdf' or mimeType = 'application/vnd.google-apps.document' or mimeType contains 'word')"
        );
        break;
      case 'folders':
        clauses.push("mimeType = 'application/vnd.google-apps.folder'");
        break;
      case 'spreadsheets':
        clauses.push(
          "(mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType contains 'excel' or mimeType contains 'spreadsheet')"
        );
        break;
    }
  }

  if (options.searchQuery && options.searchQuery.trim()) {
    const escaped = options.searchQuery.trim().replace(/['\\]/g, '\\$&');
    clauses.push(`name contains '${escaped}'`);
  }

  return clauses.join(' and ');
}

/**
 * Generates direct high-resolution web preview link for Drive image files
 */
export function getDirectDriveImagePreview(fileId: string, size: number = 800): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}
