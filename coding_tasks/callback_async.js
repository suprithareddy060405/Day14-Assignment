/**
 * Part D.1: Asynchronous file reading using a callback.
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'sample.txt');

console.log("=== Part D.1: Callback Asynchronous File Reader ===");
console.log("Initiating non-blocking file read...");

fs.readFile(targetFile, 'utf8', (error, content) => {
  if (error) {
    console.error("[ERROR] Failed to read file:", error.message);
    return;
  }
  console.log("\n[CALLBACK EXECUTED] File content successfully retrieved:");
  console.log("-----------------------------------------");
  console.log(content.trim());
  console.log("-----------------------------------------");
  console.log("===================================================\n");
});

console.log("Request placed. Asynchronous reading is running in the background...\n");
