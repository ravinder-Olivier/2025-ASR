import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [chatGPTResponse, setChatGPTResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const handleChatGPTRequest = async () => {
    if (!prompt) return;

    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:5000/chatgpt", { prompt });
      setChatGPTResponse(response.data.message); // Store response
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const uploadImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tags", tags);

    try {
      await axios.post("http://localhost:5000/upload", formData);
      await fetchImages(); // Reload images after upload
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/images");
      setImages(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
      <div className="App">
        <h1>Visual Schedule & Social Stories</h1>
        <div>
          <h2>ChatGPT</h2>
          <textarea
              placeholder="Enter prompt for ChatGPT"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
          />
          <br></br>
          <button onClick={handleChatGPTRequest}>Send to ChatGPT</button>

          {/* Show loading spinner or message when loading */}
          {loading ? <p>Loading...</p> : <p>{chatGPTResponse}</p>}
        </div>

        <div>
          <h3>Upload Image</h3>
          <input type="file" onChange={handleFileChange} />
          <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={handleTagsChange}
          />
          <button onClick={uploadImage}>Upload</button>
        </div>

        <div>
          <h3>Uploaded Images</h3>
          <ul>
            {images.map((image) => (
                <li key={image.id}>
                  <img
                      src={`http://localhost:5000/uploads/${image.filename}`}
                      alt={image.filename}
                      width={200}
                  />
                  <p>Tags: {image.tags}</p>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default App;
