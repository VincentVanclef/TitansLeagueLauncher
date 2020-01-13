"use strict";

import { app, protocol, BrowserWindow, dialog } from "electron";
import { autoUpdater, UpdateCheckResult } from "electron-updater";
import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 920,
    height: 600,
    icon: "icon.ico",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    resizable: false,
    darkTheme: true,
    center: true,
    autoHideMenuBar: true,
    maximizable: false,
    frame: false,
    backgroundColor: "#1e5898"
  });

  const handleRedirect = function(e: Event, url: string) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  };

  win.webContents.on("new-window", handleRedirect);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
    const result = autoUpdater.checkForUpdates();
  }

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools();
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

autoUpdater.on("error", error => {
  dialog.showErrorBox(
    "Error: ",
    error == null ? "unknown" : (error.stack || error).toString()
  );
});

autoUpdater.on("update-available", () => {
  dialog.showMessageBox(win!, {
    title: "Update Available",
    message: "A new update is being downloaded.",
    buttons: ["Ok"]
  });
});

autoUpdater.on("update-downloaded", function(event, releaseName) {
  // # confirm install or not to user
  dialog.showMessageBox(
    win!,
    {
      title: "Update Downloaded",
      message:
        "New version has been downloaded. Please restart the application to apply the updates.",
      buttons: ["Restart now", "Maybe later"],
      detail: releaseName
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        // # restart app, then update will be applied
        autoUpdater.quitAndInstall();
      }
    }
  );
});

// autoUpdater.on("update-not-available", () => {
//   dialog.showMessageBox({
//     title: "No Updates",
//     message: "Current version is up-to-date."
//   });
// });
