'use client'

import { useEffect, useRef, useState } from 'react';

const formatTime = (ms: number): string => {
  const milliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  const pad = (n: number, z = 2) => n.toString().padStart(z, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${Math.floor(milliseconds / 10)
    .toString()
    .padStart(2, '0')}`;
};

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsed;
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current !== null) {
          setElapsed(Date.now() - startTimeRef.current);
        }
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStartStop = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setElapsed(0);
    startTimeRef.current = null;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-72 text-center">
        <h1 className="text-2xl font-bold mb-4">⏱️ Stopwatch</h1>
        <div className="text-3xl font-mono mb-6">{formatTime(elapsed)}</div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleStartStop}
            className={`px-4 py-2 rounded-xl text-white font-semibold ${
              isRunning ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-gray-300 text-black font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
