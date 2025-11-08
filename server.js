import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// ✅ Webhook: DANA akan kirim data ke sini saat pembayaran selesai
app.post("/api/dana/finish-payment", (req, res) => {
  console.log("Finish Payment Notification:", req.body);
  res.status(200).send("OK");
});

// ✅ Webhook: DANA akan kirim data ke sini saat disbursement selesai
app.post("/api/dana/disburse-notify", (req, res) => {
  console.log("Disburse Notification:", req.body);
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
