const testDB = require("./database/models");
const { contextBridge } = require("electron");

console.log("preload");

const getManagers = () => {
  return testDB.getManagers();
};

getManagers();

/* contextBridge.exposeInMainWorld("api", {
  getManagers: getManagers,
}); */
