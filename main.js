const { app, BrowserWindow } = require("electron");
const path = require("path");
const { db } = require("./dbMngrs");

const { ipcMain } = require("electron");

db.serialize(() => {
  db.all("SELECT  * FROM managers", (err, result) => {
    if (err) {
      console.error("errore db", err);
    } else {
      console.log("managers stamp", result);
    }
  });
});

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 900,
    webPreferences: {
      /* preload: path.join(__dirname, "preload.js"), */
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // const indexPath = path.join(app.getAppPath(), "build", "index.html");
  const isDev = process.env.NODE_ENV === "development";
  const indexPath = isDev
    ? "https://localhost:3000"
    : `file://${path.join(__dirname, "build", "index.html")}`;

  mainWindow.loadURL(indexPath);
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("before-quit", () => {});
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

/* ipcMain.on("requestLogin", (event, { username, password }) => {
  // Esegui la query per confrontare l'username e la password
  db.get(
    "SELECT * FROM managers WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        console.error("Errore nella query di login:", err);
        event.reply("responseLogin", {
          success: false,
          error: "Errore durante il login",
        });
      } else {
        if (row) {
          // Utente trovato, invia una risposta di successo
          event.reply("responseLogin", { success: true, user: row });
        } else {
          // Utente non trovato, invia una risposta di errore
          event.reply("responseLogin", {
            success: false,
            error: "Credenziali non valide",
          });
        }
      }
    }
  );
}); */
