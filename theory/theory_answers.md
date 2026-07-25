# Day 14 Theory & Research Documentation

This document compiles the theoretical foundations of backend development and Node.js core architectures.

---

## 📘 Part A — Theory Questions

### 1. Explain backend development and how it differs from frontend.
* **Backend Development (Server-side):** Focuses on system architecture, database storage systems, server logic, security audits, authentication sessions, and web APIs. It manages how data is stored, processed, and served.
* **Frontend Development (Client-side):** Focuses on the user interface, styling layouts, interactive UI elements, browser execution, and visual cues.
* **Key Difference:** Frontend code compiles and runs directly in the client's web browser, dealing with user interaction. Backend code runs on remote servers or local cloud environments, dealing with data management, security, and persistence.

### 2. Explain why frontend alone is not enough, with three examples.
The browser environment is sandboxed and executes code client-side, making it insecure for persisting central records, processing financials, or locking resources.
* **Example 1: Secured User Credentials:** Storing login credentials or user passwords in the browser (e.g., localStorage) leaves them exposed to malicious scripts (XSS). A secure backend is needed to cryptographically hash and verify accounts.
* **Example 2: Inventory E-commerce Control:** If stock values were updated solely on the client, two concurrent users could buy the same remaining item, leading to database conflicts. A central backend is required to process transaction locking.
* **Example 3: Payment Gateway Processing:** Interfacing directly with card processing networks requires private merchant keys. Storing these API keys in frontend JavaScript makes them readable by anyone inspecting the code, compromising merchant accounts.

### 3. Explain client-server architecture and the request-response cycle.
* **Client-Server Architecture:** A distributed system model that separates tasks between service requestors (clients, e.g., web browsers, mobile apps) and service providers (servers, e.g., Node.js HTTP daemons).
* **Request-Response Cycle:**
  1. The client issues an **HTTP Request** containing a verb (GET/POST/etc.), a URL path (e.g., `/about`), headers (metadata), and optionally a payload body.
  2. The server receives the package, parses the parameters, processes the business/database logic, and formats the result.
  3. The server replies with an **HTTP Response** containing a status code (e.g., 200 OK), response headers (defining body encoding, content type), and the requested payload (JSON data, HTML page).

### 4. Explain what Node.js is and how it runs JavaScript outside the browser.
Node.js is an open-source, cross-platform JavaScript runtime environment built on Google Chrome's V8 engine.
* **Execution outside the browser:** Chrome's V8 engine executes JavaScript by compiling it into native machine code. Node.js encapsulates this compiler inside a C++ wrapper. Instead of browser DOM APIs (like `window` or `document`), Node.js provides native bindings to operating system calls, allowing JavaScript scripts to perform file operations, bind port numbers, establish network sockets, and run commands directly as OS processes.

### 5. Explain the V8 engine and Node.js = V8 + capabilities.
* **V8 Engine:** Google's open-source JavaScript compiler written in C++. It parses and compiles JS code straight into low-level machine assembly code at runtime, rather than interpreting it line-by-line as text.
* **Node.js Integration:** Node.js binds this engine to Libuv (providing an event loop and async I/O worker pools) and custom C++ libraries.
* **Formula:** `Node.js = V8 Engine (Javascript Execution) + Native System OS APIs (Filesystem + Network Sockets + Process Thread Pools)`.

### 6. Explain modules and the difference between CommonJS and ES Modules.
Modules allow developer code to be divided into individual, decoupled files that import and export functionality to keep projects modular.
* **CommonJS (CJS):** Node.js's original module system. Loaded synchronously using `require('./file')` and exported via `module.exports = { ... }`.
* **ES Modules (ESM):** The official ECMAScript standard. Loaded asynchronously using `import { ... } from './file'` and exported via `export const ...`. It supports static analysis, allowing build tools to prune unused imports (tree-shaking).

### 7. Explain the event loop and event-driven architecture.
* **Event-Driven Architecture:** A design paradigm where application flow is dictated by events (e.g., user input, file completions, incoming requests).
* **The Event Loop:** Node.js runs on a single thread. When an asynchronous operation is triggered (like a file read or HTTP request), it is delegated to Libuv's thread pool or OS kernels. The main thread continues running subsequent lines. When the background job completes, its callback callback is placed in a task queue. The Event Loop constantly monitors the Call Stack; as soon as it becomes empty, it takes the next callback from the queue and pushes it onto the stack to execute.

### 8. Explain synchronous vs asynchronous execution and why async matters.
* **Synchronous:** Instructions resolve sequentially. Each line blocks the thread, meaning no subsequent lines can run until the current line completes.
* **Asynchronous:** Instructions trigger tasks and yield control immediately. When the task finishes, a callback notifies the program.
* **Why it matters:** On single-threaded servers, a synchronous file load or SQL query blocks all code. All other users trying to connect would experience an unresponsive page. Asynchronous code allows a single thread to manage thousands of concurrent I/O operations without bottlenecking.

### 9. Explain callbacks, promises, and async/await, and how they relate.
They represent three generations of handling asynchronous code:
* **Callbacks:** The original mechanism where a function is passed as an parameter to execute upon process completion. Leads to "Callback Hell" when nesting operations.
* **Promises:** Objects representing the eventual completion/failure of an async call, allowing cleaner chain resolution with `.then()` and `.catch()`.
* **Async/Await:** Syntactic sugar built on top of Promises. Declaring functions `async` permits calling promises using linear-looking `await` statements wrapped inside clean `try/catch` error blocks.

### 10. Explain HTTP methods, status codes, and JSON.
* **HTTP Methods:** Action verbs specifying the operation target (GET to retrieve, POST to create, PUT to modify/replace, DELETE to remove).
* **Status Codes:** Standardized response categories (e.g., `2xx` = Success, `3xx` = Redirect, `4xx` = Client Error [e.g., 404 Not Found], `5xx` = Server Error [e.g., 500 Internal Error]).
* **JSON (JavaScript Object Notation):** A lightweight structured data format of key-value pairs used to exchange text payloads between servers and clients.

---

## 🔍 Part F — Research Activities

### 1. Research what Express.js is and why it's used.
Express.js is a minimalist, unopinionated web framework for Node.js.
* **Why it is used:** Raw Node HTTP servers require complex manual logic to extract request URLs, parse bodies, handle routes, and set content headers. Express simplifies this by offering:
  * Streamlined route handlers (e.g., `app.get('/users', handler)`).
  * Out-of-the-box support for request parsing middlewares.
  * Helper abstractions (e.g., `res.json(data)` or `res.sendFile()`).

### 2. Research REST APIs and the REST architectural style.
REST (Representational State Transfer) is an API design system that uses standard HTTP concepts. Key principles:
* **Statelessness:** No client session data is stored on the server. Every request must be self-contained.
* **Client-Server Separation:** The client and server evolve independently.
* **Uniform Interface:** Resources are identified by standard URIs (e.g. `/api/books`) and manipulated using native HTTP methods (GET, POST, PUT, DELETE).
* **JSON/XML Payload:** The data payload is sent in standardized media formats.

### 3. Research what middleware is in backend development.
Middleware is functions that sit in the middle of request processing. They have access to the Request (`req`) and Response (`res`) objects and the `next()` callback hook.
* **Functions:**
  * Validate login tokens or API headers before reaching endpoints.
  * Log incoming request data (e.g. tracking routes hit).
  * Parse complex forms or raw JSON payloads.
  * Terminate requests immediately if validations fail.

### 4. Research SQL vs NoSQL databases.
* **SQL (Relational, e.g., PostgreSQL, MySQL):** Uses structured tables with schema constraints and keys. Relies on relations. Enforces ACID reliability. Best for transactional data (e.g., financial networks, healthcare logs).
* **NoSQL (Non-Relational, e.g., MongoDB, Redis):** Schema-free document stores or key-value structures. Highly scalable and horizontal. Ideal for unstructured logs, content management, or configurations with rapid prototyping requirements.

### 5. Research how passwords are hashed (e.g., bcrypt) and why.
Storing passwords in plain text is a severe vulnerability. Security dictates storing only one-way cryptographic hashes.
* **Mechanism (bcrypt):**
  * **Salting:** Appends a random set of characters (the salt) to the password before hashing to ensure identical inputs create completely unique hashes, neutralizing Rainbow Table attacks.
  * **Key Stretching:** bcrypt runs the hash algorithm recursively (governed by a work factor cost parameter). This CPU-intensive slowdown makes hardware brute-force cracking attempts computationally unfeasible.
