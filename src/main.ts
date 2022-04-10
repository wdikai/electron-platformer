import { app, BrowserWindow } from 'electron';

function createWindow (): void {
  let window: BrowserWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadFile(__dirname + '/index.html');
  window.setMenu(null);
}

app.on('ready', createWindow);