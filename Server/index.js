const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/check-password", async (req, res) => {
  const password = req.body.password;

  // convert password to SHA1 hash
  const sha1 = crypto
    .createHash("sha1")
    .update(password)
    .digest("hex")
    .toUpperCase();

  const prefix = sha1.substring(0, 5);
  const suffix = sha1.substring(5);

  try {
    const response = await axios.get(
      `https://api.pwnedpasswords.com/range/${prefix}`
    );

    const breached = response.data.includes(suffix);

    res.json({ breached });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
