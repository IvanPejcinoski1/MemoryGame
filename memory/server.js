const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Import the CORS middleware

const app = express();
const port = 3001; // Port for the Express server

// Enable CORS for requests from the React app on port 3000
app.use(
  cors({
    origin: "http://localhost:3000", // Only allow requests from this origin
  })
);

// API route to get image names from the 'public/images' directory
app.get("/api/images", (req, res) => {
  const imagesDir = path.join(__dirname, "public/images/cardImages"); // Path to the images folder

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading images directory");
    }

    // Filter files to include only image files (you can adjust this based on your file types)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    // Return the full image names including file extensions
    res.json(imageFiles); // Send the list of image names to the frontend
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
