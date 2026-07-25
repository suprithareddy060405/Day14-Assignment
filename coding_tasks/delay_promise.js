/**
 * Part D.4: Promisified Delay Function.
 * Creates a helper that resolves a Promise after a specified timeout.
 */

function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

console.log("=== Part D.4: Promisified Delay Test ===");
console.log("Starting countdown. Resolving dynamic values...");

// Triggering delay functions
delay(1000, "First promise resolved after 1 second!")
  .then((msg) => {
    console.log(`>> ${msg}`);
    return delay(1500, "Second promise resolved after another 1.5 seconds!");
  })
  .then((msg) => {
    console.log(`>> ${msg}`);
    console.log("=========================================\n");
  });

console.log("Delay chains registered. Countdown ticking in background...\n");
