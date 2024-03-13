const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { app } = require("electron");

/* const dbPath2 = path.join(app.getPath("userData"), "database", "bigEyeDB.db");
const dbPath = path.join(__dirname, "database", "bigEyeDB.db"); */
const isDevelopment =
  process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true";
console.log("isDevelopment", isDevelopment);
const dbPath = isDevelopment
  ? path.join(app.getPath("userData"), "database", "bigEyeDB.db")
  : path.join(__dirname, "database", "bigEyeDB.db");

console.log("db path", dbPath);
const db = new sqlite3.Database(dbPath);

module.exports = { db };
