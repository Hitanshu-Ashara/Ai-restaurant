export async function sendMessage(message, cart = []) {
  const res = await fetch("http://localhost:5000/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, cart }),
  });
  return res.json();
}
