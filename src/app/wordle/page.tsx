"use client";
import { useState, useEffect, ChangeEvent, useRef } from 'react';

const WORDS: string[] = ['REACT', 'FRAME', 'SOLID', 'INPUT', 'CLOUD'];
const MAX_ATTEMPTS: number = 6;

type LetterStatus = 'correct' | 'present' | 'absent';
type Entry = {
  guess: string;
  result: LetterStatus[];
};

type GameStatus = 'playing' | 'won' | 'lost';

export default function Wordle() {
  const [targetWord, setTargetWord] = useState<string>('');
  const [guess, setGuess] = useState<string[]>(Array(5).fill(''));
  const [history, setHistory] = useState<Entry[]>([]);
  const [status, setStatus] = useState<GameStatus>('playing');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const checkGuess = (): void => {
    if (guess.length !== targetWord.length) return;

    const result: LetterStatus[] = guess.map((letter, i) => {
      if (letter === targetWord[i]) return 'correct';
      else if (targetWord.includes(letter)) return 'present';
      else return 'absent';
    });

    const entry: Entry = { guess: guess.join(''), result };
    const updatedHistory = [...history, entry];
    setHistory(updatedHistory);

    if (guess.join('') === targetWord) {
      setStatus('won');
    } else if (updatedHistory.length >= MAX_ATTEMPTS) {
      setStatus('lost');
    }

    setGuess(Array(5).fill(''));
    inputsRef.current[0]?.focus();
  };

  const getColor = (status: LetterStatus): string => {
    if (status === 'correct') return 'bg-green-500';
    if (status === 'present') return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const value = e.target.value.toUpperCase().slice(0, 1); // allow only 1 char
    const updated = [...guess];
    updated[index] = value;
    setGuess(updated);

    if (value && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !guess[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === 'Enter' && guess.join('').length === 5) {
      checkGuess();
    }
  };

  const restart = () => {
    setHistory([]);
    setGuess(Array(5).fill(''));
    inputsRef.current[0]?.focus();
    setStatus('playing');
  }

  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setTargetWord(randomWord);
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wordle</h1>

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
          {guess.map((char, i) => (
            <input
              className="border px-2 py-1 rounded w-10 h-10 text-center font-bold text-sm uppercase"
              key={i}
              type="text"
              value={char}
              maxLength={1}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
            />
          ))}
          <button
            onClick={checkGuess}
            disabled={guess.join('').length < 5}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded disabled:bg-gray-500"
          >
            Guess
          </button>
        </div>
      ) : (
        <div>
          <div className="mt-4 mb-4 text-xl font-semibold">
            {status === 'won' ? 'You Won! 🎉' : `You Lost! Word was: ${targetWord}`}
          </div>
          <button
            onClick={restart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded disabled:bg-gray-500">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
