const express = require('express');
const notesRouter = express.Router();

const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');

const notes = require('../db/db.json')

// Route for notes page
notesRouter.get('/', (req, res) => {
  res.json(notes)
});

// POST request to add a note
notesRouter.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);
 
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  
  // If all the required properties are present
  if (title && text ) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

   // Add a new note
    notes.push(newNote);
    // Write updated notes back to the file
    fs.writeFile('./db/db.json', JSON.stringify(notes),(err) =>
      err 
      ? console.error(err)
      : console.info('Successfully updated notes!')
    );
  }
});

module.exports = notesRouter;
