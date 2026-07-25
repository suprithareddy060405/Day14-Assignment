/**
 * Part B.2: Importing and exercising the CommonJS math helper module.
 */

const math = require('./math_helper');

console.log("=== Part B.2: CommonJS Module Demonstration ===");
try {
  const sum = math.add(15, 27);
  const diff = math.subtract(42, 18);
  const prod = math.multiply(6, 7);
  const quot = math.divide(100, 4);

  console.log(`15 + 27 = ${sum}`);
  console.log(`42 - 18 = ${diff}`);
  console.log(`6 * 7   = ${prod}`);
  console.log(`100 / 4 = ${quot}`);
} catch (error) {
  console.error("Module error:", error.message);
}
console.log("================================================\n");
