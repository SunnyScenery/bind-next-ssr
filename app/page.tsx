"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  async function handleUpload() {
    setStatus("Uploading…");
    try {
      const res = await fetch("/api/upload", { method: "POST" });
      if (!res.ok) {
        const text = await res.text();
        setStatus(`API error ${res.status}: ${text}`);
        return;
      }
      const { url, key } = await res.json();

      const putRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "text/plain" },
        body: "hello world",
      });
      if (!putRes.ok) {
        const text = await putRes.text();
        setStatus(`S3 error ${putRes.status}: ${text}`);
        return;
      }

      setStatus(`Uploaded: ${key}`);
    } catch (e) {
      setStatus(`Error: ${(e as Error).message}`);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">S3 Uploader</h1>
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload to S3
      </button>
      {status && <p className="text-sm text-gray-600 max-w-lg break-all">{status}</p>}
    </main>
  );
}
