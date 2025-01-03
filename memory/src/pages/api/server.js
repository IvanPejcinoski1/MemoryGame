import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const imagesDir = path.join(process.cwd(), "public/images/cardImages");

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Error reading images directory" });
    }

    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );
    res.status(200).json(imageFiles);
  });
}
