"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");

  async function handleFetch() {
    setContent("Loading…");
    try {
      const res = await fetch(`/api/upload?t=${Date.now()}`);
      if (!res.ok) {
        const text = await res.text();
        setContent(`Error ${res.status}: ${text}`);
        return;
      }
      const data = await res.json();
      setContent(data.content);
    } catch (e) {
      setContent(`Error: ${(e as Error).message}`);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">S3 Reader</h1>
      <button
        onClick={handleFetch}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Read from S3
      </button>
      {content && <p className="text-lg">{content}</p>}
    </main>
  );
}
