/**
 * Part E.5: System Info Tool.
 * Logs core platform architecture, hardware cpu details, and physical memory.
 */

const os = require('os');

console.log("=========================================");
console.log("        SYSTEM INFO TELEMETRY            ");
console.log("=========================================");

const bytesToGb = (bytes) => (bytes / (1024 * 1024 * 1024)).toFixed(2);

console.log(`OS Platform:      ${os.platform()} (${os.type()})`);
console.log(`Architecture:     ${os.arch()}`);
console.log(`OS Release:       ${os.release()}`);
console.log(`Host Machine Name: ${os.hostname()}`);
console.log(`CPU Cores:        ${os.cpus().length} core(s)`);
console.log(`CPU Model:        ${os.cpus()[0] ? os.cpus()[0].model.trim() : 'N/A'}`);

const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;

console.log(`Total RAM:        ${bytesToGb(totalMem)} GB`);
console.log(`Used RAM:         ${bytesToGb(usedMem)} GB`);
console.log(`Free RAM:         ${bytesToGb(freeMem)} GB`);
console.log(`Uptime:           ${(os.uptime() / 3600).toFixed(2)} hours`);
console.log("=========================================\n");
