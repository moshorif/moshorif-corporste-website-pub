import { getAccessToken } from './googleDriveAuth';
import {
  DriveFileItem,
  buildDriveQuery,
  PORTFOLIO_DRIVE_FOLDER_ID,
  PORTFOLIO_DRIVE_URL,
} from '../utils/drive';

export interface DriveListResponse {
  files: DriveFileItem[];
  nextPageToken?: string;
  source: 'google-api' | 'portfolio-archive';
}

export interface DriveQuotaResponse {
  limit?: string;
  usage?: string;
  usageInDrive?: string;
  usageInDriveTrash?: string;
  user?: {
    displayName?: string;
    emailAddress?: string;
    photoLink?: string;
  };
}

/**
 * Curated archive of Mohammad Shoriful Islam's Google Drive portfolio items
 * Matching the real portfolio drive folder: 103EoiBcdPOwKDAZpHskiAzdixoF8cGmI
 */
export const PORTFOLIO_DRIVE_ARCHIVE: DriveFileItem[] = [
  {
    id: 'gdrive_lenscart_meta_116',
    name: 'LensCart - Meta Ads Performance Overview (Sept 2026).png',
    mimeType: 'image/png',
    size: '124930',
    modifiedTime: '2026-09-21T10:14:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
    thumbnailLink: '/assets/aistudio/Meta-ads-moshorif__116__99f4ee55.png',
  },
  {
    id: 'gdrive_lenscart_meta_117',
    name: 'LensCart - Messaging Campaigns ROAS ($0.28 per conversation).png',
    mimeType: 'image/png',
    size: '138400',
    modifiedTime: '2026-09-20T14:22:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
    thumbnailLink: '/assets/aistudio/Meta-ads-moshorif__117__cebccdcf.png',
  },
  {
    id: 'gdrive_lenscart_meta_114',
    name: 'LensCart - Ultra-low CPL Messaging ($0.03 per conversation).png',
    mimeType: 'image/png',
    size: '142100',
    modifiedTime: '2026-09-15T08:30:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
    thumbnailLink: '/assets/aistudio/Meta-ads-moshorif__114__3cb71b4a.png',
  },
  {
    id: 'gdrive_audience_targeting_112',
    name: 'Meta Ads Manager - Detailed Audience & Interest Targeting Setup.png',
    mimeType: 'image/png',
    size: '389200',
    modifiedTime: '2026-08-28T16:05:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
    thumbnailLink: '/assets/aistudio/Meta-ads-moshorif__112__91c35b52.png',
  },
  {
    id: 'gdrive_page_growth_113',
    name: 'Meta Ads - Page Growth & Likes ($0.01 per Like - 641 Likes).png',
    mimeType: 'image/png',
    size: '118700',
    modifiedTime: '2026-09-05T11:45:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
    thumbnailLink: '/assets/aistudio/Meta-ads-moshorif__113__a9898971.png',
  },
  {
    id: 'gdrive_budget_scheduling_111',
    name: 'Meta Ads Manager - Advantage Campaign Budget & Scheduling.png',
    mimeType: 'image/png',
    size: '298400',
    modifiedTime: '2026-09-12T09:15:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
    thumbnailLink: '/assets/aistudio/Meta-ads-moshorif__111__7eed43e3.png',
  },
  {
    id: 'gdrive_gads_doc',
    name: 'Mohammad_Shoriful_Islam_GAds_portfolio.pdf',
    mimeType: 'application/pdf',
    size: '1845200',
    modifiedTime: '2026-08-10T12:00:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
    iconLink: 'https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png',
  },
  {
    id: 'gdrive_perf_marketing_cv',
    name: 'Mohammad_Shoriful_Islam_Performance_Marketing.pdf',
    mimeType: 'application/pdf',
    size: '420100',
    modifiedTime: '2026-09-01T15:30:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
    iconLink: 'https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png',
  },
  {
    id: 'gdrive_web_elements_pdf',
    name: 'Web_elements_Personal_moshorif.pdf',
    mimeType: 'application/pdf',
    size: '984500',
    modifiedTime: '2026-07-15T09:10:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
    iconLink: 'https://ssl.gstatic.com/docs/doclist/images/icon_10_pdf_list.png',
  },
  {
    id: 'gdrive_lead_campaign_8',
    name: 'Automotive & Real Estate - High Intent Lead Capture (LEAD8).png',
    mimeType: 'image/png',
    size: '182300',
    modifiedTime: '2026-06-20T17:40:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
  },
  {
    id: 'gdrive_lpv_5',
    name: 'High Conversion E-Commerce Landing Page Visits (LPV5).png',
    mimeType: 'image/png',
    size: '165400',
    modifiedTime: '2026-05-18T14:15:00Z',
    webViewLink: PORTFOLIO_DRIVE_URL,
  },
];

/**
 * List files from Google Drive v3 REST API
 */
export async function listGoogleDriveFiles(options: {
  folderId?: string;
  searchQuery?: string;
  typeFilter?: 'all' | 'images' | 'documents' | 'folders' | 'spreadsheets';
  pageSize?: number;
  pageToken?: string;
}): Promise<DriveListResponse> {
  const token = await getAccessToken();

  // If no live token is present, serve the verified portfolio Google Drive archive
  if (!token) {
    let filtered = [...PORTFOLIO_DRIVE_ARCHIVE];

    if (options.typeFilter && options.typeFilter !== 'all') {
      if (options.typeFilter === 'images') {
        filtered = filtered.filter((f) => f.mimeType.startsWith('image/'));
      } else if (options.typeFilter === 'documents') {
        filtered = filtered.filter((f) => f.mimeType === 'application/pdf');
      } else if (options.typeFilter === 'folders') {
        filtered = filtered.filter((f) => f.mimeType === 'application/vnd.google-apps.folder');
      }
    }

    if (options.searchQuery && options.searchQuery.trim()) {
      const q = options.searchQuery.trim().toLowerCase();
      filtered = filtered.filter((f) => f.name.toLowerCase().includes(q));
    }

    return {
      files: filtered,
      source: 'portfolio-archive',
    };
  }

  // Real Google Drive API call
  try {
    const q = buildDriveQuery({
      folderId: options.folderId,
      searchQuery: options.searchQuery,
      typeFilter: options.typeFilter,
      includeTrashed: false,
    });

    const params = new URLSearchParams({
      pageSize: String(options.pageSize || 40),
      fields:
        'nextPageToken, files(id, name, mimeType, thumbnailLink, webViewLink, webContentLink, iconLink, size, modifiedTime, createdTime)',
      orderBy: 'folder,modifiedTime desc',
    });

    if (q) {
      params.append('q', q);
    }
    if (options.pageToken) {
      params.append('pageToken', options.pageToken);
    }

    const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Google Drive authorization expired. Please sign in again.');
      }
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `Google Drive API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      files: data.files || [],
      nextPageToken: data.nextPageToken,
      source: 'google-api',
    };
  } catch (err: any) {
    console.error('Error fetching live Google Drive files:', err);
    throw err;
  }
}

/**
 * Upload a file to Google Drive using multipart upload
 */
export async function uploadGoogleDriveFile(
  file: File,
  folderId?: string
): Promise<DriveFileItem> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google to upload files to your Google Drive.');
  }

  const metadata: any = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
  };

  if (folderId && folderId !== 'root_all') {
    metadata.parents = [folderId];
  }

  const boundary = '-------' + Math.random().toString(36).substring(2);
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const reader = new FileReader();
  const fileArrayBuffer = await file.arrayBuffer();

  const metadataPart = `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(
    metadata
  )}`;
  const mediaHeader = `${delimiter}Content-Type: ${
    file.type || 'application/octet-stream'
  }\r\n\r\n`;

  const multipartBlob = new Blob(
    [metadataPart, mediaHeader, new Uint8Array(fileArrayBuffer), closeDelimiter],
    { type: `multipart/related; boundary=${boundary}` }
  );

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,thumbnailLink,webViewLink,webContentLink,size,modifiedTime',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: multipartBlob,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Failed to upload file to Google Drive (${response.status})`
    );
  }

  return await response.json();
}

/**
 * Create a new folder in Google Drive
 */
export async function createGoogleDriveFolder(
  name: string,
  parentFolderId?: string
): Promise<DriveFileItem> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google to create folders.');
  }

  const bodyData: any = {
    name: name.trim(),
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentFolderId && parentFolderId !== 'root_all') {
    bodyData.parents = [parentFolderId];
  }

  const response = await fetch(
    'https://www.googleapis.com/drive/v3/files?fields=id,name,mimeType,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to create folder in Google Drive');
  }

  return await response.json();
}

/**
 * Delete a file or folder from Google Drive
 * CRITICAL: Caller MUST prompt user with explicit confirmation dialog before invoking this!
 */
export async function deleteGoogleDriveFile(fileId: string): Promise<void> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Please sign in with Google to delete files.');
  }

  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to delete file from Google Drive');
  }
}

/**
 * Get Google Drive storage quota and user info
 */
export async function getGoogleDriveQuota(): Promise<DriveQuotaResponse | null> {
  const token = await getAccessToken();
  if (!token) return null;

  try {
    const response = await fetch(
      'https://www.googleapis.com/drive/v3/about?fields=storageQuota,user',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) return null;
    const data = await response.json();
    return {
      limit: data.storageQuota?.limit,
      usage: data.storageQuota?.usage,
      usageInDrive: data.storageQuota?.usageInDrive,
      usageInDriveTrash: data.storageQuota?.usageInDriveTrash,
      user: data.user,
    };
  } catch {
    return null;
  }
}
