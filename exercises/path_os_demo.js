/**
 * Part B.4: Path and OS native modules demonstration.
 * Retrieves system metrics and demonstrates path resolution utilities.
 */

const os = require('os');
const path = require('path');

console.log("=== Part B.4: OS and Path Modules Demonstration ===");

// 1. OS details
console.log("--- OS Telemetry Info ---");
console.log(`OS Platform:     ${os.platform()}`);
console.log(`OS Type:         ${os.type()}`);
console.log(`Architecture:    ${os.arch()}`);
console.log(`CPU Count:       ${os.cpus().length} core(s)`);
console.log(`Free Memory:     ${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
console.log(`Total Memory:    ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`);
console.log(`System Uptime:   ${(os.uptime() / 3600).toFixed(2)} hours`);

// 2. Path details
console.log("\n--- Path Parsing Info ---");
const samplePath = "/usr/local/bin/project/app.js";
console.log(`Sample File Path: ${samplePath}`);
console.log(`Joined Path:      ${path.join('usr', 'local', 'config.json')}`);
console.log(`Resolved Path:    ${path.resolve('exercises', 'path_os_demo.js')}`);
console.log(`File Extension:   ${path.extname(samplePath)}`);
console.log(`Base Filename:    ${path.basename(samplePath)}`);
console.log(`Dir Name:         ${path.dirname(samplePath)}`);
console.log("==================================================\n");
