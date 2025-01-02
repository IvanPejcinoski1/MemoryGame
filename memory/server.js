const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/api/images", (req, res) => {
  const imagesDir = path.join(__dirname, "public/images/cardImages");
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading images directory");
    }
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    res.json(imageFiles);
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
