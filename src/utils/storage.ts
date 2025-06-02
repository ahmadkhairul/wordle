const STORAGE_KEY = 'url-mapping';

export type UrlRecord = {
  clicks: number;
  original: string;
  createdAt: string
}

export function saveUrl(short: string, original: string) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  data[short] = { original, clicks: 0, createdAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getUrl(short?: string) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return short ? data[short] : data;
}

export function deleteUrl(short: string) {
  let data = getUrl();
  delete data[short];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function incrementClick(short: string) {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  if (data[short]) {
    data[short].clicks += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}
