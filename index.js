const express = require("express");
const { exec } = require("child_process");
const app = express();

// برای پردازش JSON
app.use(express.json());

// مسیر اصلی برای تست ساده
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// مسیر دانلود واقعی
app.post("/download", (req, res) => {
  const { url, quality } = req.body;

  if (!url || !quality) {
    return res.status(400).json({ error: "لینک یا کیفیت ارسال نشده ❌" });
  }

  // اجرای yt-dlp برای گرفتن لینک دانلود
  exec(`yt-dlp -f "best[height=${quality}]" -g ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error("Download error:", stderr);
      return res.status(500).json({ error: "خطا در گرفتن لینک دانلود ❌" });
    }

    const downloadUrl = stdout.trim();

    res.json({
      message: "لینک دانلود آماده شد ✅",
      videoUrl: url,
      quality: quality,
      downloadUrl: downloadUrl
    });
  });
});

// اجرای سرور
app.listen(3000, () => console.log("Server running on port 3000"));
