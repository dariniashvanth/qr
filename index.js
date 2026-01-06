const express = require("express");
const qrcode = require("qrcode");
const path = require("path");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


const sizes = { small: 150, medium: 250, large: 350 };


app.get("/", (req, res) => {
 
  res.render("index", { datapass: "/images/Capture.png" });
});


app.post("/thankyou", (req, res) => {
  const { textareatag, qrColor, bgColor, size } = req.body;

  const qrOptions = {
    width: sizes[size] || 250,
    color: {
      dark: qrColor || "#8d8686",
      light: bgColor || "#ffffff",
    },
  };

  qrcode.toDataURL(textareatag || " ", qrOptions, (err, data) => {
    if (err) return res.send("Error generating QR");

    
    res.render("qrcode", { datapass: data });
  });
});


app.listen(10000, () => console.log("Server running on http://localhost:10000"));
