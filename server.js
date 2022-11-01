const express = require('express');
const path = require ('path');
const apiRouter = require('./routes/apiRouter');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount the appiRouter onto the express app - anytime you see the enpoint /api go get the apiRouter
app.use('/api', apiRouter);

app.use(express.static('public'));

// Route for home page html (or any wildcard *)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
// Get route for notes html page
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => 
    console.log(`App now running on http://localhost:${PORT}`)
);
