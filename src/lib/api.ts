const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sendThought(text: string, source: "text" | "voice" = "text") {
  const res = await fetch(`${API_BASE}/api/input`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, source }),
  });
  return res.json();
}

export async function fetchTimeline() {
  const res = await fetch(`${API_BASE}/api/timeline`);
  return res.json();
}

export async function checkSnapshot() {
  const res = await fetch(`${API_BASE}/api/snapshot/latest`);
  if (res.status === 404) return null;
  return res.json();
}

export async function resumeSession() {
  const res = await fetch(`${API_BASE}/api/resume`, { method: "POST" });
  return res.json();
}

export async function requestJoyDose() {
  const res = await fetch(`${API_BASE}/api/joy-dose`, { method: "POST" });
  return res.json();
}