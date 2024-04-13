const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { spawn } = require('child_process');

let mainWindow;
let serverProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 860,
    height: 460,
    webPreferences: {
      nodeIntegration: true // Required to use node modules in renderer process
    }
  });
  mainWindow.loadURL('http://localhost:6020'); 	
  // Start the server process
  //serverProcess = spawn('node' ,['/home/wireless/Desktop/Gateway2.0/server/server.js']); // Replace with your actual command

  //serverProcess.stdout.on('data', (data) => {
    // Log server output
    //console.log(`Server stdout: ${data}`);
    // Once server is ready, load the URL
    //if (data.includes('Server listening on port')) {
      //mainWindow.loadURL('http://localhost:6020'); // Replace with your frontend URL
    //}
  //});

  mainWindow.on('closed', function() {
    mainWindow = null;
    // Terminate the server process when the window is closed
    //serverProcess.kill();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

