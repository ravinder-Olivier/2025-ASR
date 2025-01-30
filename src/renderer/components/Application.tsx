import React, { useEffect, useState } from 'react';
import '@styles/app.scss';
import icons from '@components/icons';
import promptHandler from "./lib/promptHandler"


const Application: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true);
  const [versions, setVersions] = useState<Record<string, string>>({});
  const [prompt, setPrompt] = useState('');
  /**
   * On component mount
   */
  useEffect(() => {
    const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
    if (isNaN(useDarkTheme)) {
      setDarkTheme(true);
    } else if (useDarkTheme == 1) {
      setDarkTheme(true);
    } else if (useDarkTheme == 0) {
      setDarkTheme(false);
    }

    // Apply verisons
    const app = document.getElementById('app');
    const versions = JSON.parse(app.getAttribute('data-versions'));
    setVersions(versions);
  }, []);

  /**
   * On Dark theme change
   */
  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem('dark-mode', '1');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('dark-mode', '0');
      document.body.classList.remove('dark-mode');
    }
  }, [darkTheme]);

  /**
   * Toggle Theme
   */
  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }

  const handleSubmit = (event:any) => {
    event.preventDefault(); // Prevents default form submission behavior
    console.log('Submitted prompt:', prompt);
    displayMsg(await promptHandler(prompt))
    // Perform any other actions, like sending data to a server
  };

  return (
    <div id='erwt'>
      <div className='header'>
        <div className='main-heading'>
          <h1 className='themed'>ASR-2025</h1>
        </div>
        <div className='main-teaser'>
          ravinder-Olivier
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Prompt:
            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>

    </div>
  );
};

export default Application;
/*
<div className='versions'>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.electron}/> Electron
            </div>
            <span>{versions?.electron}</span>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.erwt}/> ERWT
            </div>
            <span>{versions?.erwt}</span>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.typescript}/> Typescript
            </div>
            <span>{versions?.typescript}</span>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.nodejs}/> Nodejs
            </div>
            <span>{versions?.node}</span>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.react}/> React
            </div>
            <span>{versions?.react}</span>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.webpack}/> Webpack
            </div>
            <span>{versions?.webpack}</span>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.chrome}/> Chrome
            </div>
            <span>{versions?.chrome}</span>
          </div>
          <div className='item'>
            <div>
              <img className='item-icon' src={icons.license}/> License
            </div>
            <span>{versions?.license}</span>
          </div>
        </div>
 */