'use strict';
const electron = require('electron')

// Module to control application life.
const app = electron.app

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Initiate backend `LoopBack`
require(__dirname+'/server/server.js');

// Initiate backend `LoopBack`
require(__dirname+'/pdf.js/gulpfile.js');

//toFIX
// report crashes to the Electron project
//require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();


let mainWindow

function createWindow () {
	mainWindow = new BrowserWindow({width: 800, height: 600})
	mainWindow.loadURL('http://localhost:3000/index.html')

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})
