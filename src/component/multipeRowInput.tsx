import { useRef, useState } from 'react';

export default function WordleRow() {
  const [letters, setLetters] = useState<string[]>(Array(5).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.toUpperCase().slice(0, 1); // allow only 1 char
    const updated = [...letters];
    updated[index] = value;
    setLetters(updated);

    if (value && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !letters[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2">
      {letters.map((char, i) => (
        <input
          className="border px-2 py-1 rounded w-10 h-10 text-center text-2xl uppercase"
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
    </div>
  );
}
