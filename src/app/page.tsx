"use client";

import Link from "next/link";


export default function Homepage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Homepage</h1>
      <li>
        <Link href="/wordle"> wordle</Link>
      </li>
    </div>
  );
}
