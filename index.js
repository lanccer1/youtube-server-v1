const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.listen(3000, () => console.log("Server running on port 3000"));

// مسیر دانلود
app.post("/download", (req, res) => {
  const { url, quality } = req.body;

  // فعلاً فقط تستی جواب می‌ده
  res.json({
    message: "Download request received ✅",
    videoUrl: url,
    quality: quality
  });
});
