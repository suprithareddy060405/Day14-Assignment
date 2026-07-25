/**
 * Raw Node.js HTTP Backend Server.
 * Implements:
 *   - Part C: Routing for /, /about, /contact, dynamic routes, JSON responses, 404 handles.
 *   - Part E.1: Complete Student Info Backend with endpoints.
 *   - Part E.2: Books API.
 *   - Part E.4: Routing for multiple resources (Students, Courses).
 */

const http = require('http');
const url = require('url');

// --- Mock Database Arrays ---
const students = [
  { id: '101', name: 'Suhas Reddy', age: 21, course: 'Web Engineering', grade: 'A' },
  { id: '102', name: 'Priya Sharma', age: 22, course: 'Machine Learning', grade: 'B' },
  { id: '103', name: 'Ananya Rao', age: 20, course: 'Cloud Computing', grade: 'A' },
  { id: '104', name: 'Nikhil Kumar', age: 23, course: 'Data Science', grade: 'A' }
];

const courses = [
  { id: 'web-eng', title: 'Web Engineering', duration: '12 weeks', instructor: 'Dr. Arjun' },
  { id: 'ml', title: 'Machine Learning', duration: '16 weeks', instructor: 'Prof. Tanya' },
  { id: 'cloud', title: 'Cloud Computing', duration: '10 weeks', instructor: 'Mr. Vikram' }
];

const books = [
  { id: 'book-1', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', year: 2018 },
  { id: 'book-2', title: "You Don't Know JS", author: 'Kyle Simpson', year: 2015 },
  { id: 'book-3', title: 'Clean Code', author: 'Robert C. Martin', year: 2008 }
];

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Parse request url parameters
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Split path token parts for dynamic matching (e.g. /api/students/101 => ['api', 'students', '101'])
  const pathParts = pathname.split('/').filter(Boolean);

  console.log(`[${new Date().toLocaleTimeString()}] ${method} request to: ${pathname}`);

  // Helper utility to write JSON responses
  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // Helper utility to write HTML responses
  const sendHTML = (statusCode, htmlContent) => {
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
  };

  // 1. Root Directory GET / -> HTML Welcome Greeting (Part C.1, C.2)
  if (pathname === '/' && method === 'GET') {
    const welcomeHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Node.js Core Server - Day 14</title>
        <style>
          body { font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; }
          h1 { color: #6366f1; border-bottom: 2px solid #1e293b; padding-bottom: 0.5rem; }
          code { background: #1e293b; padding: 0.2rem 0.4rem; border-radius: 4px; color: #f43f5e; }
          ul { line-height: 1.8; }
          .endpoint { font-weight: bold; color: #10b981; }
        </style>
      </head>
      <body>
        <h1>Hello from Day 14 Backend Server!</h1>
        <p>This is a raw Node.js HTTP server. Explore the active backend endpoints:</p>
        <ul>
          <li><span class="endpoint">GET /about</span> - JSON info about the server (Part C.2, C.3)</li>
          <li><span class="endpoint">GET /contact</span> - JSON support contacts (Part C.2, C.3)</li>
          <li><span class="endpoint">GET /api/students</span> - List all students (Part E.1, E.4)</li>
          <li><span class="endpoint">GET /api/students/:id</span> - Retrieve dynamic student by ID (Part C.5, E.1)</li>
          <li><span class="endpoint">POST /api/students</span> - Create a new student (payload body JSON)</li>
          <li><span class="endpoint">GET /api/courses</span> - List all courses (Part E.4)</li>
          <li><span class="endpoint">GET /api/courses/:id</span> - Retrieve dynamic course by ID</li>
          <li><span class="endpoint">GET /api/books</span> - List all books (Part E.2)</li>
          <li><span class="endpoint">GET /api/books/:id</span> - Retrieve dynamic book by ID (Part E.2)</li>
        </ul>
      </body>
      </html>
    `;
    sendHTML(200, welcomeHTML);
  }

  // 2. GET /about -> JSON data response (Part C.2, C.3)
  else if (pathname === '/about' && method === 'GET') {
    sendJSON(200, {
      message: 'Core Node.js Application Server',
      version: '1.0.0',
      uptime: `${process.uptime().toFixed(2)} seconds`,
      platform: process.platform,
      arch: process.arch
    });
  }

  // 3. GET /contact -> JSON data response (Part C.2, C.3)
  else if (pathname === '/contact' && method === 'GET') {
    sendJSON(200, {
      department: 'Student Portal Support',
      email: 'supritha.reddy@github.io',
      phone: '+91 98765 XXXXX',
      available: '24/7'
    });
  }

  // 4. GET /api/students -> Return student list (Part E.1, E.4)
  else if (pathname === '/api/students' && method === 'GET') {
    sendJSON(200, students);
  }

  // 5. POST /api/students -> Add new student profile (Part E.1 enhancement)
  else if (pathname === '/api/students' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        if (!payload.name || !payload.course) {
          sendJSON(400, { error: "Validation failed: 'name' and 'course' are required fields." });
          return;
        }

        const newStudent = {
          id: (Date.now() % 10000).toString(),
          name: payload.name,
          age: payload.age || 20,
          course: payload.course,
          grade: payload.grade || 'A'
        };

        students.push(newStudent);
        sendJSON(201, { message: "Student record registered successfully.", student: newStudent });
      } catch (err) {
        sendJSON(400, { error: "Invalid JSON request payload." });
      }
    });
  }

  // 6. GET /api/students/:id -> Dynamic Student Details (Part C.5, E.1)
  else if (pathParts[0] === 'api' && pathParts[1] === 'students' && pathParts[2] && method === 'GET') {
    const studentId = pathParts[2];
    const student = students.find(s => s.id === studentId);

    if (student) {
      sendJSON(200, student);
    } else {
      sendJSON(404, { error: `Student profile with ID ${studentId} not found.` });
    }
  }

  // 7. GET /api/courses -> Return courses list (Part E.4)
  else if (pathname === '/api/courses' && method === 'GET') {
    sendJSON(200, courses);
  }

  // 8. GET /api/courses/:id -> Dynamic Course Details
  else if (pathParts[0] === 'api' && pathParts[1] === 'courses' && pathParts[2] && method === 'GET') {
    const courseId = pathParts[2];
    const course = courses.find(c => c.id === courseId);

    if (course) {
      sendJSON(200, course);
    } else {
      sendJSON(404, { error: `Course details with ID ${courseId} not found.` });
    }
  }

  // 9. GET /api/books -> Return list of books (Part E.2)
  else if (pathname === '/api/books' && method === 'GET') {
    sendJSON(200, books);
  }

  // 10. GET /api/books/:id -> Dynamic Book Details (Part E.2)
  else if (pathParts[0] === 'api' && pathParts[1] === 'books' && pathParts[2] && method === 'GET') {
    const bookId = pathParts[2];
    const book = books.find(b => b.id === bookId);

    if (book) {
      sendJSON(200, book);
    } else {
      sendJSON(404, { error: `Book record with ID ${bookId} not found.` });
    }
  }

  // 11. Catch-all unmatched routes -> JSON 404 (Part C.4)
  else {
    sendJSON(404, { 
      error: "Route not found.", 
      message: `Endpoint ${pathname} with method ${method} does not exist.`
    });
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Day 14 Raw HTTP Server running on http://localhost:${PORT}`);
  console.log(`   Press Ctrl+C to shutdown server session.`);
  console.log(`======================================================\n`);
});
