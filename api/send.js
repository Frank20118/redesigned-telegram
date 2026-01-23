export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { nick } = req.body || {};

  if (!nick || !nick.trim()) {
    return res.status(400).json({ ok: false, error: "Empty nick" });
  }

  const token = process.env.TG_TOKEN;
  const chatId = process.env.TG_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: "ENV not set" });
  }

  const tgRes = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `🎡 РУЛЕТКА НИКОВ\n\n🔥 Выпал ник:\n👉 ${nick}`
      })
    }
  );

  const data = await tgRes.json();

  // 🔥 ВАЖНО: возвращаем ПОЛНЫЙ ответ Telegram
  return res.status(200).json(data);
}
