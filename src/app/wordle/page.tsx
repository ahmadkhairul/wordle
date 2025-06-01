"use client";
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import WordleRow from '@/component/multipeRowInput';

const WORDS: string[] = ['react', 'frame', 'solid', 'input', 'cloud'];
const MAX_ATTEMPTS: number = 6;

type LetterStatus = 'correct' | 'present' | 'absent';
type Entry = {
  guess: string;
  result: LetterStatus[];
};

type GameStatus = 'playing' | 'won' | 'lost';

export default function Wordle() {
  const [targetWord, setTargetWord] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [history, setHistory] = useState<Entry[]>([]);
  const [status, setStatus] = useState<GameStatus>('playing');

  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(randomWord);
  }, []);

  const checkGuess = (): void => {
    if (guess.length !== targetWord.length) return;

    const result: LetterStatus[] = guess.split('').map((letter, i) => {
      if (letter === targetWord[i]) return 'correct';
      else if (targetWord.includes(letter)) return 'present';
      else return 'absent';
    });

    const entry: Entry = { guess, result };
    const updatedHistory = [...history, entry];
    setHistory(updatedHistory);

    if (guess === targetWord) {
      setStatus('won');
    } else if (updatedHistory.length >= MAX_ATTEMPTS) {
      setStatus('lost');
    }

    setGuess('');
  };

  const getColor = (status: LetterStatus): string => {
    if (status === 'correct') return 'bg-green-500';
    if (status === 'present') return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setGuess(e.target.value.toLowerCase());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkGuess();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wordle Clone</h1>

      {history.map((entry, i) => (
        <div key={i} className="flex space-x-2 mb-2">
          {entry.guess.split('').map((letter, j) => (
            <div
              key={j}
              className={`w-10 h-10 text-white font-bold flex items-center justify-center ${getColor(entry.result[j])}`}
            >
              {letter.toUpperCase()}
            </div>
          ))}
        </div>
      ))}

      {status === 'playing' ? (
        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            value={guess}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            maxLength={targetWord.length}
            className="border px-2 py-1 rounded w-full"
          />
          <button
            onClick={checkGuess}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          >
            Guess
          </button>
          <WordleRow />
        </div>
      ) : (
        <div className="mt-4 text-xl font-semibold">
          {status === 'won' ? 'You Won! 🎉' : `You Lost! Word was: ${targetWord}`}
        </div>
      )}
    </div>
  );
}
