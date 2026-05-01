"use client";

import { useState } from "react";
import { readFromS3 } from "./actions";

export default function Home() {
  const [result, setResult] = useState("");

  async function handleClick() {
    setResult("Loading…");
    const res = await readFromS3();
    setResult(res.content ?? `Error: ${res.error}`);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">S3 Reader</h1>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Read from S3
      </button>
      {result && <p className="text-lg">{result}</p>}
    </main>
  );
}
