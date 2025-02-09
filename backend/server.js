const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require('fs');

const app = express();
const port = 5000;
const filepath = "./public/db.json";

app.use(cors());
app.use(express.static("public"));

// Set up Multer for image uploads
const upload = multer({
  dest: "./public/uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
});

// Simple in-memory array to store image data (for now, instead of a database)
let images = [];

// Load images from the file when the server starts
const loadImages = () => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (!err && data) {
      try {
        images = JSON.parse(data);
      } catch (err) {
        console.error('Failed to parse JSON:', err);
      }
    }
  });
};

// Save images array to a file
const saveImages = () => {
  fs.writeFile(filepath, JSON.stringify(images, null, 2), (err) => {
    if (err) {
      console.error('Failed to save images:', err);
    } else {
      console.log('Images saved to file');
    }
  });
};

// Load images on server start
loadImages();

// Handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  const { tags } = req.body;
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  // Store image data
  images.push({
    id: images.length + 1,
    filename: file.filename,
    tags: tags || "No tags",
  });

  // Save updated images array to file
  saveImages();

  res.status(200).send("File uploaded successfully");
});

// Fetch images
app.get("/images", (req, res) => {
  res.json({ images });
});

app.listen(port, () => {
  console.log(`Backend Express server running on http://localhost:${port}`);
});
