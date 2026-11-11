import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatDriveFileSize,
  getDriveMediaType,
  extractDriveIdFromUrl,
  buildDriveQuery,
  getDirectDriveImagePreview,
  PORTFOLIO_DRIVE_FOLDER_ID,
} from './drive.js';

test('formatDriveFileSize handles numbers, strings, and edge cases', () => {
  assert.equal(formatDriveFileSize(undefined), '—');
  assert.equal(formatDriveFileSize(0), '0 B');
  assert.equal(formatDriveFileSize(1024), '1.0 KB');
  assert.equal(formatDriveFileSize('2097152'), '2.0 MB');
  assert.equal(formatDriveFileSize(1073741824), '1.0 GB');
});

test('getDriveMediaType identifies correct media categories', () => {
  assert.equal(getDriveMediaType('image/png'), 'image');
  assert.equal(getDriveMediaType('image/jpeg'), 'image');
  assert.equal(getDriveMediaType('application/pdf'), 'pdf');
  assert.equal(getDriveMediaType('application/vnd.google-apps.folder'), 'folder');
  assert.equal(getDriveMediaType('application/vnd.google-apps.spreadsheet'), 'spreadsheet');
  assert.equal(getDriveMediaType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'), 'spreadsheet');
  assert.equal(getDriveMediaType('application/vnd.google-apps.document'), 'document');
  assert.equal(getDriveMediaType('video/mp4'), 'video');
  assert.equal(getDriveMediaType('application/zip'), 'archive');
  assert.equal(getDriveMediaType('unknown/binary'), 'other');
});

test('extractDriveIdFromUrl extracts folder and file IDs accurately', () => {
  const folderUrl = 'https://drive.google.com/drive/folders/103EoiBcdPOwKDAZpHskiAzdixoF8cGmI?usp=drive_link';
  assert.equal(extractDriveIdFromUrl(folderUrl), PORTFOLIO_DRIVE_FOLDER_ID);

  const fileUrl = 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view';
  assert.equal(extractDriveIdFromUrl(fileUrl), '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms');

  const paramUrl = 'https://drive.google.com/open?id=1AbcXYZ123456789_-abcdef';
  assert.equal(extractDriveIdFromUrl(paramUrl), '1AbcXYZ123456789_-abcdef');

  const rawId = '103EoiBcdPOwKDAZpHskiAzdixoF8cGmI';
  assert.equal(extractDriveIdFromUrl(rawId), '103EoiBcdPOwKDAZpHskiAzdixoF8cGmI');

  assert.equal(extractDriveIdFromUrl('not-a-valid-url'), null);
});

test('buildDriveQuery constructs valid Google Drive query clauses', () => {
  const basic = buildDriveQuery({ folderId: 'folder123' });
  assert.ok(basic.includes('trashed = false'));
  assert.ok(basic.includes("'folder123' in parents"));

  const withImages = buildDriveQuery({
    folderId: 'folder123',
    typeFilter: 'images',
    searchQuery: 'Meta-ads',
  });
  assert.ok(withImages.includes("mimeType contains 'image/'"));
  assert.ok(withImages.includes("name contains 'Meta-ads'"));

  const allTypes = buildDriveQuery({
    folderId: 'root_all',
    typeFilter: 'all',
  });
  assert.equal(allTypes, 'trashed = false');
});

test('getDirectDriveImagePreview creates high-res image thumbnail URL', () => {
  const preview = getDirectDriveImagePreview('file123', 1200);
  assert.equal(preview, 'https://drive.google.com/thumbnail?id=file123&sz=w1200');
});
