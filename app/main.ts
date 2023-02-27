import { app, BrowserWindow, screen, ipcRenderer } from 'electron';
import * as fs from 'fs';
const path = require('path')
var ipc = require('electron').ipcMain;

let win: BrowserWindow = null;
const args = process.argv.slice(1),
serve = args.some(val => val === '--serve');

let pathIndex = './';
        
if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
    // Path when running electron in local folder
    pathIndex = '../dist/';
}


function createWindow(): BrowserWindow {

    const size = screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
        x: 0,
        y: 0,
        minWidth: 500,
        minHeight: 200,
        width: size.width,
        height: size.height,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
            webPreferences: {
            devTools: !app.isPackaged,
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    
    win.webContents.on('before-input-event', (event, input) => {
        if ((input.control || input.meta) && input.key.toLowerCase() === 'r') {
          console.log('Pressed Control or CMD +r')
          win.webContents.reloadIgnoringCache()
        }
        if ((input.control || input.meta) && input.key.toLowerCase() === 'd') {
          console.log('Pressed Control or CMD +d')
          win.webContents.openDevTools();
        }
    })


    if (serve) {
        const debug = require('electron-debug');
        debug();
        
        require('electron-reloader')(module);
        win.loadURL('http://localhost:4200');

        win.on("show", () => {
            if (win.webContents) win.webContents.openDevTools();
        })
    } else {
        const url = new URL(path.join('file:', __dirname, pathIndex + "index.html"));
        win.loadURL(url.href);
        
        win.setMenuBarVisibility(false)
    
    }
    
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });


    return win;
}

try {

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', () => {
        
        // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
        // setTimeout(createWindow, 400)
        let main = createWindow();
        
        main.on('maximize', function(event) {
            main.webContents.send('maximized', 'maximizedMsg');
        });
        main.on('unmaximize', function(event) {
            main.webContents.send('unmaximized', 'unmaximizedMsg');
        });

    });

    app.on('browser-window-created', (event, window) => {
        if (window) {
            window.setMenuBarVisibility(false)
            window.webContents.closeDevTools();
        }
    });
    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
    
    app.on('will-quit', () => {      
    });

} catch (e) {
    // Catch Error
    throw e;
}



ipc.on('getPlatform', function(event, data){
    event.sender.send('getPlatformRply', process.platform)
});

ipc.on('actionMin', function(event, data){
    if (win !== null) win.minimize(); 
});

ipc.on('actionMax', function(event, data){
    if (win !== null) win.maximize(); 
});

ipc.on('actionRestore', function(event, data){
    if (win !== null) win.unmaximize(); 
});

ipc.on('actionClose', function(event, data){
    if (win !== null) win.close(); 
});

