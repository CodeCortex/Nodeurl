const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = 5003;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("It is running successfully");
});

app.post("/api/getdata", async (req, res) => {
  const { url } = req.body;
  console.log("URL:", url);

  try {
    const response = await axios.get(url, { timeout: 2000 });
    console.log("Status:", response.status);

    const $ = cheerio.load(response.data);

    $('script, style, noscript, iframe, nav, header').remove();

    $('[style*="display:none"], [style*="visibility:hidden"]').remove();

    const text = $("body").text().replace(/\s{2,}/g, " ").trim();

    res.json({ success: true, content: text });
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});


const d = {
  name: "roshan jaiswal",
  age: "23"
};

app.get('/api/d', async (req, res) => {
  res.json({data:d}); 
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
