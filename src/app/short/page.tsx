'use client';

import { useEffect, useState } from 'react';
import { generateHash } from '@/utils/generateHash';
import { saveUrl, getUrl, UrlRecord, deleteUrl } from '@/utils/storage';

export default function Home() {
  const [longUrl, setLongUrl] = useState<string>('');
  const [data, setData] = useState({});

  const refreshData = () => {
    const allUrl = getUrl();
    setData(allUrl)
  }

  const handleShorten = () => {
    const hash = generateHash();
    saveUrl(hash, longUrl);
    refreshData();
    setLongUrl('');
  };

  const handleDelete = (short: string) => {
    deleteUrl(short);
    refreshData();
  }

  const handleRedirect = (short: string) => {
    window.open(`/short/${short}`, '_blank'); // opens in a new tab
    setTimeout(() => {
      refreshData();
    }, 500)
  }

  useEffect(() => {
    refreshData();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Bitly Clone (Frontend Only)</h1>
      <div className="flex gap-8 w-full items-center justify-center mb-4">
        <input
          className="border p-2 w-full max-w-md"
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleShorten}
        >
          Shorten URL
        </button>
      </div>
      {data && (
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Short URL</th>
              <th className="border px-4 py-2">Clicked (times)</th>
              <th className="border px-4 py-2">Original</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {(Object.entries(data) as [string, UrlRecord][]).map(([short, info]) => (
              <tr key={short}>
                <td className="border px-4 py-2">
                  <div
                    onClick={() => handleRedirect(short)}
                    className="text-blue-500 underline cursor-pointer"
                  >
                    {window.location.origin}/short/{short}
                  </div>
                </td>
                <td className="border px-4 py-2">{info.clicks}</td>
                <td className="border px-4 py-2">{info.original}</td>
                <td className="border px-4 py-2">{new Date(info.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-400 text-white rounded-md py-1 px-4"
                    onClick={() => handleDelete(short)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

