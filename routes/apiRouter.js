const express = require('express');
const apiRouter = express.Router();
const notesRouter = require('./notesRouter');

// mount the notesRouter onto the apiRouter - anytime you see the enpoint /api/notes go get the notesRouter
apiRouter.use('/notes', notesRouter);


module.exports = apiRouter;
