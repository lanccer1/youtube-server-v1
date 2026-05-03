const express = require("express");
const ytdlp = require("yt-dlp-exec");
const app = express();

app.use(express.json());

// مسیر اصلی
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// مسیر دانلود واقعی
app.post("/download", async (req, res) => {
  const { url, quality } = req.body;

  if (!url || !quality) {
    return res.status(400).json({ error: "لینک یا کیفیت ارسال نشده ❌" });
  }

  try {
    // اجرای yt-dlp برای گرفتن لینک دانلود
    const result = await ytdlp(url, {
      f: `best[height=${quality}]`,
      g: true
    });

    res.json({
      message: "لینک دانلود آماده شد ✅",
      videoUrl: url,
      quality: quality,
      downloadUrl: result.trim()
    });
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ error: "خطا در گرفتن لینک دانلود ❌" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));