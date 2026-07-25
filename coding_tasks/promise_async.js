/**
 * Part D.2: Asynchronous file reading using Promises.
 * Uses fs.promises and .then()/.catch() methods.
 */

const fs = require('fs').promises;
const path = require('path');

const targetFile = path.join(__dirname, 'sample.txt');

console.log("=== Part D.2: Promise-based Asynchronous File Reader ===");
console.log("Initiating promise-based file read...");

fs.readFile(targetFile, 'utf8')
  .then((content) => {
    console.log("\n[.THEN RESOLVED] File content successfully retrieved:");
    console.log("-----------------------------------------");
    console.log(content.trim());
    console.log("-----------------------------------------");
    console.log("========================================================\n");
  })
  .catch((error) => {
    console.error("[.CATCH REJECTED] Failed to read file:", error.message);
  });

console.log("Promise registered. Script is executing concurrently...\n");
