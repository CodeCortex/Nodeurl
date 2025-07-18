const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = 5003;

app.use(express.json());
app.use(cors());

// var corsOptions={
//   origin: 'https://bhimamobility.com',
//   optionsSuccessStatus: 200 
// }

app.get('/', (req, res) => {
  res.send("It is running successfully");
});

// var tex=null; //

app.post("/api/getdata" , async (req, res) => {
  const { url } = req.body;
  console.log("URL:", url);

  try {
    const response = await axios.get(url, { timeout: 2000 });
    console.log("Status:", response.status);

    const $ = cheerio.load(response.data);

    $('script, style, noscript, iframe, nav, header').remove();

    $('[style*="display:none"], [style*="visibility:hidden"]').remove();

    const text = $("body").text().replace(/\s{2,}/g, " ").trim();
    tex= text;

    res.json({ success: true, content: text });
  } catch (error) {
    console.error("Fetch error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// app.get('/getd', cors(corsOptions) , async(req, res)=>{
//   try {
//     if(!tex){
//       return res.status(400).json({message: false, message:"Post is not working"});
//     }
//     res.send(tex)
//   } catch (error) {
//     res.send("got error in tex " +  error.message)
    
//   }
  
// })

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
