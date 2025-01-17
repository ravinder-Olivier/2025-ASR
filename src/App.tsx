/*
Copyright 2025 Ravinder Olivier Singh Dadiala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { createSignal } from "solid-js";
import "./App.css";
import {promptHandler} from "./lib/promptHandler.ts";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [promptMsg, setPromptMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function prompt() {
    setPromptMsg (await promptHandler(name()));
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
          placeholder="Enter a prompt..."
        />
        <button type="submit">Create</button>
      </form>
      <p>{promptMsg()}</p>
    </main>
  );
}

export default App;