/**
 * Part D.5: Synchronous vs Asynchronous Execution Demonstration.
 * Performs file reads in both modes, showing the call execution order via console logs.
 */

const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'sample.txt');

console.log("=== Part D.5: Synchronous vs Asynchronous Comparison ===");

// ---------------- 1. SYNCHRONOUS DEMO (BLOCKING) ----------------
console.log("\n[1] Starting SYNCHRONOUS file read...");
console.log("[1] (Block Start) Waiting for readFileSync to complete...");

const syncData = fs.readFileSync(targetFile, 'utf8');

console.log("[1] (Block End) readFileSync returned data!");
console.log(`[1] Sync Read length: ${syncData.length} characters.`);
console.log("[1] Moving past synchronous block code.");

// ---------------- 2. ASYNCHRONOUS DEMO (NON-BLOCKING) ----------------
console.log("\n[2] Starting ASYNCHRONOUS file read...");
console.log("[2] Triggering non-blocking fs.readFile...");

fs.readFile(targetFile, 'utf8', (err, asyncData) => {
  if (err) {
    console.error("[2] [CALLBACK] Async read failed:", err.message);
    return;
  }
  console.log("\n[2] [CALLBACK CALLBACK] fs.readFile has finished background execution!");
  console.log(`[2] [CALLBACK] Async Read length: ${asyncData.length} characters.`);
  console.log("=== Demonstration Finished ===\n");
});

console.log("[2] Triggered! Note how this line runs IMMEDIATELY after fs.readFile call,");
console.log("[2] BEFORE the callback executes. This proves the thread was not blocked!");
console.log("------------------------------------------------------------------------");
