const express = require("express");
const bodyParser = require("body-parser");
const { createPayment } = require("./dana");

const app = express();
app.use(bodyParser.json());

// ✅ Tes server
app.get("/", (req, res) => {
  res.send("Server berjalan di Render 🚀");
});

// ✅ Buat transaksi ke DANA Sandbox
app.post("/api/dana/pay", async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const result = await createPayment(orderId, amount);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat transaksi" });
  }
});

// ✅ Webhook notifikasi pembayaran
app.post("/api/dana/finish-payment", (req, res) => {
  console.log("📩 Notifikasi DANA:", req.body);
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
