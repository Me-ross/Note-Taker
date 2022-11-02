const express = require('express');
const notesRouter = express.Router();

const path = require('path');
const fs = require('fs');
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');

let parsedNote = [];

const notes = require('../db/db.json')

// Route for notes page
notesRouter.get('/', (req, res) => {
  console.log(notes)
  res.json(notes)
  // console.info(`${req.method} request received for notes`);
  // // get existing notes
  // fs.readFile('./db/db.json', 'utf8', (err, data) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     parsedNote = JSON.parse(data);
  //     console.log('existing notes db at initial read:')
  //     console.log(parsedNote)
  //     res.json(parsedNote)
  //   }
  // });
});

// POST request to add a note
notesRouter.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);
 
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  console.log('user input note')
  console.log(req.body);
  
  // If all the required properties are present
  if (title && text ) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };
    console.log('newNote after uuid add')
    console.log(newNote)
   // Add a new note
    parsedNote.push(newNote);
    console.log('db added with new note')
    console.log(parsedNote)
    // Write updated notes back to the file
    fs.writeFile('./db/db.json', JSON.stringify(parsedNote),(err) =>
      err 
      ? console.error(err)
      : console.info('Successfully updated notes!')
    );
  }
});

module.exports = notesRouter;