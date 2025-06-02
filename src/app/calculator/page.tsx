'use client'

import { useState } from 'react';

const buttonLabels = [
  'AC', '←', '%', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '='
];

export default function Home() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | number>('');

  const isOperator = (val: string) => ['+', '-', '*', '/', '%'].includes(val);

  const handleClick = (value: string) => {
    if (value === 'AC') {
      setExpression('');
      setResult('');
    } else if (value === '←') {
      setExpression(expression.slice(0, -1));
    } else if (value === '=') {
      try {
        const computed = computeExpression(expression);
        setResult(computed);
      } catch {
        setResult('Error');
      }
    } else {
      // Prevent multiple operators in a row
      const lastChar = expression.slice(-1);
      if (isOperator(lastChar) && isOperator(value)) return;
      setExpression(expression + value);
    }
  };

  const computeExpression = (exp: string): number => {
    const tokens = exp.match(/(\d+\.?\d*|\+|\-|\*|\/|%)/g);
    if (!tokens) throw new Error('Invalid expression');

    const stack: number[] = [];
    let currentOp: string | null = null;

    for (const token of tokens) {
      if (!isNaN(Number(token))) {
        const num = Number(token);
        if (currentOp === null) {
          stack.push(num);
        } else {
          const prev = stack.pop()!;
          switch (currentOp) {
            case '+': stack.push(prev + num); break;
            case '-': stack.push(prev - num); break;
            case '*': stack.push(prev * num); break;
            case '/': stack.push(prev / num); break;
            case '%': stack.push(prev % num); break;
          }
          currentOp = null;
        }
      } else {
        currentOp = token;
      }
    }

    return stack[0];
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[300px]">
        <div className="bg-black text-white rounded-xl p-4 text-right">
          <div className="text-sm text-gray-400">{expression || '0'}</div>
          <div className="text-2xl font-bold">{result !== '' ? result : ''}</div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {buttonLabels.map((label) => (
            <button
              key={label}
              className={`p-4 text-lg font-medium rounded-xl ${label === '='
                  ? 'bg-blue-600 text-white'
                  : isOperator(label)
                    ? 'bg-orange-500 text-white'
                    : label === 'AC' || label === '←'
                      ? 'bg-gray-300 text-black'
                      : 'bg-gray-100 text-black'
                }`}
              onClick={() => handleClick(label)}
              style={label === '0' ? { gridColumn: 'span 2' } : {}}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
