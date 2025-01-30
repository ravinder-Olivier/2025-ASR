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

import { ipcRenderer } from 'electron';

const titlebarContext = {
  exit() {
    ipcRenderer.invoke('window-close');
  },
  undo() {
    ipcRenderer.invoke('web-undo');
  },
  redo() {
    ipcRenderer.invoke('web-redo');
  },
  cut() {
    ipcRenderer.invoke('web-cut');
  },
  copy() {
    ipcRenderer.invoke('web-copy');
  },
  paste() {
    ipcRenderer.invoke('web-paste');
  },
  delete() {
    ipcRenderer.invoke('web-delete');
  },
  select_all() {
    ipcRenderer.invoke('web-select-all');
  },
  reload() {
    ipcRenderer.invoke('web-reload');
  },
  force_reload() {
    ipcRenderer.invoke('web-force-reload');
  },
  toggle_devtools() {
    ipcRenderer.invoke('web-toggle-devtools');
  },
  actual_size() {
    ipcRenderer.invoke('web-actual-size');
  },
  zoom_in() {
    ipcRenderer.invoke('web-zoom-in');
  },
  zoom_out() {
    ipcRenderer.invoke('web-zoom-out');
  },
  toggle_fullscreen() {
    ipcRenderer.invoke('web-toggle-fullscreen');
  },
  minimize() {
    ipcRenderer.invoke('window-minimize');
  },
  toggle_maximize() {
    ipcRenderer.invoke('window-toggle-maximize');
  },
  open_url(url: string) {
    ipcRenderer.invoke('open-url', url);
  },
};

export type TitlebarContextApi = typeof titlebarContext;

export default titlebarContext;
