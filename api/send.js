export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nick } = req.body;

  if (!nick || !nick.trim()) {
    return res.status(400).json({ error: "Nick is empty" });
  }

  const token = process.env.TG_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: "ENV not set" });
  }

  const text = `🎡 РУЛЕТКА НИКОВ\n\n🔥 Выпал ник:\n👉 ${nick}`;

  const tgRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text
      })
    }
  );

  const data = await tgRes.json();
  res.status(200).json(data);
}
