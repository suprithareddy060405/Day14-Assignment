/**
 * Part B.5: Event Emitter demonstration.
 * Creates an event emitter instance, sets up an event listener, and fires the event with payloads.
 */

const EventEmitter = require('events');

// Create instance
const customEmitter = new EventEmitter();

console.log("=== Part B.5: Event Emitter Demonstration ===");

// 1. Register listener for 'userLoggedIn'
customEmitter.on('userLoggedIn', (user) => {
  console.log(`[EVENT RECEIVED] Event listener fired: userLoggedIn`);
  console.log(`>> Welcome back, ${user.name}! (Role: ${user.role}, Timestamp: ${user.timestamp})`);
});

// 2. Register listener for 'systemShutdown'
customEmitter.once('systemShutdown', (code) => {
  console.log(`[EVENT RECEIVED] Event listener fired: systemShutdown (Exit Code: ${code})`);
});

// 3. Emit events
console.log("Emitting 'userLoggedIn' event with Suhas's profile payload...");
customEmitter.emit('userLoggedIn', {
  name: 'Suhas Reddy',
  role: 'Administrator',
  timestamp: new Date().toLocaleTimeString()
});

console.log("\nEmitting 'systemShutdown' event...");
customEmitter.emit('systemShutdown', 0);

// Emitting systemShutdown again to show 'once' listener does not fire again
console.log("\nEmitting 'systemShutdown' event again (should be ignored by once listener)...");
customEmitter.emit('systemShutdown', 1);

console.log("==============================================\n");
