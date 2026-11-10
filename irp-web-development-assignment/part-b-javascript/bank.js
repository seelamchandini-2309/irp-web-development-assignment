"use strict"; // Catches silent mistakes, e.g. assigning to undeclared or constant variables

// ============================================================
// PART 1: Types & Coercion
// ============================================================

// Why "5" + 2 gives "52": with +, if either side is a string, JavaScript
// converts the other side to a string and joins them (concatenation).
// Why "5" - 2 gives 3: there is no string version of -, so JavaScript
// converts "5" to the number 5 and does real maths.
// Why typeof null === "object": a historical bug from the first version of
// JavaScript that was never fixed, because changing it would break old code.
// So null must be checked explicitly with === null.

/**
 * Validates a raw user value and returns a positive number.
 * Never logs: it either returns a number or throws an Error.
 */
function parseAmount(input) {
  // Guard null/undefined first: Number(null) is 0 and Number(undefined) is NaN
  if (input === null || input === undefined) {
    throw new Error("Amount is required.");
  }

  // Only strings and numbers are acceptable raw input types
  if (typeof input !== "string" && typeof input !== "number") {
    throw new Error(`Invalid type: expected string or number but got ${typeof input}.`);
  }

  let value = input;

  if (typeof value === "string") {
    // Remove outer spaces so " 250 " becomes "250"
    value = value.trim();

    // Number("") is 0, which would slip through, so block empty text first
    if (value === "") {
      throw new Error("Amount cannot be empty.");
    }
  }

  // Explicit conversion: we choose when and how the type changes
  const amount = Number(value);

  // "abc" and "12.5.3" convert to NaN; NaN === NaN is false, so use Number.isNaN
  if (Number.isNaN(amount)) {
    throw new Error(`"${input}" is not a valid number.`);
  }

  // A bank amount must be greater than zero
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }

  return amount;
}

// Test runner: parseAmount is called inside try/catch for every input
const testInputs = ["500", " 250 ", "", "abc", null, undefined, "12.5.3"];

console.log("--- PART 1: parseAmount tests ---");
for (const input of testInputs) {
  try {
    const result = parseAmount(input);
    console.log(`Input ${JSON.stringify(input)} -> returns ${result}`);
  } catch (error) {
    console.log(`Input ${JSON.stringify(input)} -> throws: ${error.message}`);
  }
}

// ============================================================
// PART 2: Scoping & Hoisting
// ============================================================

// ---- Step 1: Main declarations ----
// const for the bank name because it never changes; trying to reassign it throws an error.
// let for the counter because its value increases with every transaction.
const BANK_NAME = "JS National Bank";
let transactionCounter = 0;

transactionCounter++; // allowed: let can be reassigned
console.log("\n--- PART 2: Scoping & Hoisting ---");
console.log(`${BANK_NAME} | transactions so far: ${transactionCounter}`);

// ---- Step 2: Hoisting demo ----
// HOISTING DEMO
// Execution context creation phase: JavaScript scans the code first, registers
// declarations in memory, then runs the code line by line in the execution phase.
//   - var is registered and set to undefined straight away.
//   - let/const are registered but stay uninitialised (Temporal Dead Zone) until their line runs.
//   - function declarations are registered with their full body.
//   - function expressions follow the rules of the variable that holds them.

console.log("\n// HOISTING DEMO");

// var: hoisted and initialised as undefined, so no error
console.log("var before declaration:", hoistedVar);
var hoistedVar = "I am var";

// let: hoisted but in the Temporal Dead Zone, so access throws ReferenceError
try {
  console.log(blockedLet);
  let blockedLet = "I am let";
} catch (error) {
  console.log(`let before declaration -> ${error.name}: ${error.message}`);
}

// Function declaration: fully hoisted, so calling it early works
announce();
function announce() {
  console.log("Function declaration: announce() ran before its definition.");
}

// Function expression: only the var name is hoisted (as undefined), not the function,
// so calling it early means calling undefined, which throws a TypeError
try {
  notify();
} catch (error) {
  console.log(`Function expression before definition -> ${error.name}: ${error.message}`);
}
var notify = function () {
  console.log("notify() ran.");
};

// ---- Step 3: The asynchronous loop bug ----
// var is function/global scoped, so all three callbacks share ONE variable i.
// The loop finishes (i becomes 3) before any setTimeout callback runs, so all print 3.
// let creates a fresh binding of i for each iteration, so each callback keeps its own value.
console.log("\n--- Async loop bug ---");

for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i); // prints 3, 3, 3
  }, 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(function () {
    console.log("let loop:", j); // prints 0, 1, 2
  }, 0);
}
