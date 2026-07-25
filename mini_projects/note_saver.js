/**
 * Part E.3: Note Saver CLI Mini-Project.
 * Writes and reads notes from a text file using Node's fs module.
 * 
 * Usage:
 *   node note_saver.js add "your note here"
 *   node note_saver.js read
 *   node note_saver.js clear
 */

const fs = require('fs');
const path = require('path');

const notesFile = path.join(__dirname, 'notes.txt');
const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : '';

console.log("=== Part E.3: File-Based Note Saver CLI ===");

if (command === 'add') {
  const noteText = args.slice(1).join(' ');
  if (!noteText.trim()) {
    console.log("Error: Please provide note content. E.g., node note_saver.js add \"Study Node.js\"");
    process.exit(1);
  }

  const timestamp = new Date().toLocaleString();
  const formattedNote = `[${timestamp}] ${noteText}\n`;

  fs.appendFileSync(notesFile, formattedNote, 'utf8');
  console.log("Note successfully recorded!");
  console.log(`Saved: ${formattedNote.trim()}`);

} else if (command === 'read') {
  if (!fs.existsSync(notesFile)) {
    console.log("No notes recorded yet. Add one using: node note_saver.js add \"your note\"");
    process.exit(0);
  }

  console.log("Retrieving registered notes:\n");
  const content = fs.readFileSync(notesFile, 'utf8').trim();
  
  if (!content) {
    console.log("Note file is empty.");
  } else {
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      console.log(`${index + 1}. ${line}`);
    });
  }

} else if (command === 'clear') {
  if (fs.existsSync(notesFile)) {
    fs.writeFileSync(notesFile, '', 'utf8');
    console.log("All notes cleared successfully.");
  } else {
    console.log("No note file existed to clear.");
  }

} else {
  console.log("Usage instructions:");
  console.log("  node note_saver.js add \"<content>\" - Save a new note");
  console.log("  node note_saver.js read           - Read all notes");
  console.log("  node note_saver.js clear          - Empty note storage");
}

console.log("===========================================\n");
