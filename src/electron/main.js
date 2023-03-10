const { app, BrowserWindow, Menu } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const url = require('url');
const FileAPI = require('file-api');
const processVideo = require('./process-video');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const log = require('electron-log');
log.transports.file.level = 'debug';
autoUpdater.logger = log;
autoUpdater.checkForUpdatesAndNotify();

function loadUrl() {
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '../../build/index.html'),
      protocol: 'file:',
      slashes: true
    })
  );
}
function reload() {
  win.reload();
}
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 9999,
    height: 9999,
    minWidth: 1185,
    minHeight: 768,
    icon: path.join(__dirname, '../../build/assets/icon.png'),
    'web-preferences': {
      'web-security': false
    }
  });

  // and load the index.html of the app.
  loadUrl();

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);

  // Open the DevTools.
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

const mainMenuTemplate = [{}];

if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
        accelerator: 'F12'
      },
      {
        label: 'Refresh App',
        click(item, focusedWindow) {
          loadUrl();
        },
        accelerator: 'F5'
      }
    ]
  });
}
