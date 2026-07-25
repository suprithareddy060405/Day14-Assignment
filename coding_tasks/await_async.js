/**
 * Part D.3: Asynchronous file reading using Async/Await.
 * Employs try/catch block for clean error logging.
 */

const fs = require('fs').promises;
const path = require('path');

const targetFile = path.join(__dirname, 'sample.txt');

async function readSampleFile() {
  console.log("=== Part D.3: Async/Await File Reader ===");
  console.log("Executing async function scope...");
  
  try {
    const content = await fs.readFile(targetFile, 'utf8');
    console.log("\n[AWAIT COMPLETED] File content successfully retrieved:");
    console.log("-----------------------------------------");
    console.log(content.trim());
    console.log("-----------------------------------------");
  } catch (error) {
    console.error("[AWAIT EXCEPTION] Error while reading file:", error.message);
  }
  
  console.log("=========================================\n");
}

readSampleFile();
console.log("Async thread spawned. Execution continues below block call...\n");
