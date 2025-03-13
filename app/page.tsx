"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generateText = async () => {
    if (!prompt) return;
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
        }),
      });
      const data = await res.json();
      setResponse(data.response || "No response.");
    } catch (error) {
      setResponse("Error generating text.");
    } finally {
      setLoading(false);
    }
  };

  const handleMusic = () =>{
    
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">AI Text Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full max-w-md p-2 border rounded"
        placeholder="Enter your prompt..."
        rows={4}
      />
      <button
        onClick={generateText}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100 max-w-md">
          <p>{response}</p>
        </div>
      )}
      <Button className='' onClick={handleMusic}>Music</Button>
    </div>
  );
}