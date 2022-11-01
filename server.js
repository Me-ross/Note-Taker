const express = require('express');
const path = require ('path');
const data = require('./Develop/db/db.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for home page (or any wildcard *)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});
// Route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(data)
    console.log(data)
})

app.listen(3001, () => {
    console.log('App now running on http://localhost:3001/');
});
