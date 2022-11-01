const express = require('express');
const notesRouter = express.Router();

const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');

// Route for notes page
notesRouter.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
});

// POST request to add a note
notesRouter.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
    console.log(req.body);
  
    // If all the required properties are present
    if (title && text ) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
      console.log(newNote)
      // Obtain existing notes
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
           console.error(err);
        } else {
          // Notes are JSON objects we need to parse them into javascript object - Convert string into JSON object
          const parsedNote = JSON.parse(data);
           // Add a new note
          parsedNote.push(newNote);
          // Write updated notes back to the file
          fs.writeFile('./db/db.json', JSON.stringify(parsedNote),(err) =>
             err 
             ? console.error(err)
             : console.info('Successfully updated notes!')
          );
        }
      });
    }
    else {
      res.status(500).json('Error in posting note');
    }
});

module.exports = notesRouter;