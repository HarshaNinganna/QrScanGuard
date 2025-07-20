import dayjs from 'dayjs';

const STORAGE_KEY = 'qr_scans';

export const getScans = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  const parsed = JSON.parse(raw);
  const now = dayjs();

  // Filter expired scans
  return parsed.filter(scan => now.diff(dayjs(scan.timestamp), 'hour') < 24);
};

export const saveScan = (data) => {
  const scans = getScans();
  if (scans.length >= 50) return false;

  scans.push({
    data,
    timestamp: dayjs().toISOString(),
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(scans));
  return true;
};
