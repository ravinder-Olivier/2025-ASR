const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const  bodyParser = require("body-parser");
const app = express();
const port = 5000;
const filepath = "./public/db.json";
const OpenAI = require("openai");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});


function scripter(resprompt) {
  return ("This is a request being called from an application that is designed to create visual schedules and social stories for autistic children. This application will use this response to create a visual schedule / social story. I need a response corresponding to the prompt:" + resprompt + ". That is in the format of a json array. This should specify which image to use when given"+images.toString()+". Using those images make a json array that can be used in a program to combine these images and text into the final image. Raw JSON format directly to be used in a program. Identify which image to use based on the tag, however give me the location of the image in the response. Each filename has a corresponding tag, use the tags to understand what the image is. Use the filename when referencing it into the JSON. ALSO ONLY JSON NO BULLSHIT. ONLY JSON NO BULLSHIT.")
}

// Handle ChatGPT request
app.post("/chatgpt", async (req, res) => {
  const { prompt } = req.body; // No need for 'await' here, as it's synchronous

  if (!prompt) {
    return res.status(400).send("No prompt provided");
    console.log("yes")
  }

  try {
    // Send request to OpenAI's API
    console.log(prompt)
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Ensure the model name is correct
      messages: [{ role: "user", content: scripter(prompt) }],
    });

    // Send response from OpenAI back to frontend
    res.status(200).json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).send("Error generating response from ChatGPT");
  }
});


// image generator here



const upload = multer({
  dest: "./public/uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
});

let images = [];


const loadImages = () => {
  fs.readFile(filepath, "utf8", (err, data) => {
    if (!err && data) {
      try {
        images = JSON.parse(data);
      } catch (err) {
        console.error("Failed to parse JSON:", err);
      }
    }
  });
};


const saveImages = () => {
  fs.writeFile(filepath, JSON.stringify(images, null, 2), (err) => {
    if (err) {
      console.error("Failed to save images:", err);
    } else {
      console.log("Images saved to file");
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
