const express = require("express");
const app = express();

// برای پردازش JSON
app.use(express.json());

// مسیر اصلی
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// مسیر دانلود
app.post("/download", (req, res) => {
  const { url, quality } = req.body;

  res.json({
    message: "Download request received ✅",
    videoUrl: url,
    quality: quality
  });
});

// اجرای سرور
app.listen(3000, () => console.log("Server running on port 3000"));
