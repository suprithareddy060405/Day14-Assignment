/**
 * Part B.3: File System module demonstration.
 * Writes a file, appends additional text, and reads the final output.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'demo.txt');

console.log("=== Part B.3: File System (fs) Demonstration ===");

// 1. Write to the file
const initialContent = "Hello from Node.js!\nThis file was created programmatically.\n";
console.log(`Writing initial text to: ${filePath}`);
fs.writeFileSync(filePath, initialContent, 'utf8');

// 2. Append to the file
const appendContent = "Appending this new line of logs dynamically.\n";
console.log("Appending logs to the file...");
fs.appendFileSync(filePath, appendContent, 'utf8');

// 3. Read from the file
console.log("Reading content back from the file:");
const fileData = fs.readFileSync(filePath, 'utf8');
console.log("----------------- FILE CONTENT -----------------");
console.log(fileData.trim());
console.log("------------------------------------------------");

// Cleanup demo file
try {
  fs.unlinkSync(filePath);
  console.log("Temporary demo file cleaned up successfully.");
} catch (err) {
  console.error("Cleanup error:", err.message);
}
console.log("================================================\n");
