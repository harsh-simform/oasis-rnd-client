/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { ipcRenderer } = require("electron");
const imageContainer = document.getElementById("image-container");
const selection = document.getElementById("selection");
let startX, startY, endX, endY;

imageContainer.addEventListener("mousedown", (event) => {
  startX = event.offsetX;
  startY = event.offsetY;
  endX = startX;
  endY = startY;
  selection.style.left = startX + "px";
  selection.style.top = startY + "px";
  selection.style.width = "0px";
  selection.style.height = "0px";
  selection.style.display = "block";
});

imageContainer.addEventListener("mousemove", (event) => {
  if (startX !== undefined && startY !== undefined) {
    endX = event.offsetX;
    endY = event.offsetY;
    const selectionLeft = Math.min(startX, endX);
    const selectionTop = Math.min(startY, endY);
    const selectionWidth = Math.abs(endX - startX);
    const selectionHeight = Math.abs(endY - startY);
    selection.style.left = selectionLeft + "px";
    selection.style.top = selectionTop + "px";
    selection.style.width = selectionWidth + "px";
    selection.style.height = selectionHeight + "px";
  }
});

imageContainer.addEventListener("mouseup", async (event) => {
  console.log(startX, startY, endX, endY);
  ipcRenderer.invoke("calculate-pixels", { startX, startY, endX, endY, name: 'Sample-Barb.bmp' });
  startX = undefined;
  startY = undefined;
});
