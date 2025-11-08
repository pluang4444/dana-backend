const crypto = require("crypto");
const axios = require("axios");

// === GANTI SESUAI DANA SANDBOX PUNYA KAMU ===
const merchantId = "21662001000842712956";
const clientId = "2025110820155212570770";
const clientSecret = "ISI_CLIENT_SECRET_KAMU_DI_SINI";
const apiUrl = "https://api.sandbox.dana.id";

function generateSignature(path, body) {
  const payload = path + JSON.stringify(body);
  return crypto.createHmac("sha256", clientSecret).update(payload).digest("hex");
}

async function createPayment(orderId, amount) {
  const path = "/pg/v1/hostToHostPayment";
  const body = {
    merchantId,
    orderId,
    amount,
    currency: "IDR",
    callbackUrl: "https://dana-backend-0wqb.onrender.com/api/dana/finish-payment",
    returnUrl: "https://google.com", // ganti ke frontend kamu nanti
  };

  const signature = generateSignature(path, body);

  const headers = {
    "Content-Type": "application/json",
    "Client-Id": clientId,
    "Request-Time": new Date().toISOString(),
    "Signature": signature,
  };

  try {
    const res = await axios.post(apiUrl + path, body, { headers });
    return res.data;
  } catch (err) {
    console.error("DANA API Error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { createPayment };
