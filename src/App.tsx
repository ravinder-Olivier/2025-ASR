import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [promptMsg, setPromptMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function prompt() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setPromptMsg(await invoke("greet", { name: name() }));
  }

  return (
    <main class="container">
      <h1>Asr25</h1>
      <p>24-25</p>
      <form
        class="row"
        onSubmit={(e) => {
          e.preventDefault();
          prompt();
        }}
      >
        <input
          id="prompt-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{promptMsg()}</p>
    </main>
  );
}

export default App;
