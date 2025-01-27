import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import promptHandler from "./lib/promptHandler"


function App() {
  const [selectedValue, setSelectedValue] = useState('option1');
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await promptHandler(name, selectedValue));
  }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };



    return (
    <main className="container">
      <h1>asr25</h1>
        <form
            className="row"
            onSubmit={(e) => {
                e.preventDefault();
                greet();
            }}
        >
            <input
                id="greet-input"
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Enter a name..."
            />
            <label>
                <input
                    type="radio"
                    value="option1"
                    checked={selectedValue === 'option1'}
                    onChange={handleChange}
                />
                Social S
            </label>
            <label>
                <input
                    type="radio"
                    value="option2"
                    checked={selectedValue === 'option2'}
                    onChange={handleChange}
                />
                Visual S
            </label>
            <button type="submit">Greet</button>
        </form>
        <p>{greetMsg}</p>
    </main>
    );
}

export default App;
