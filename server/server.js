const express = require('express');
const app = express();
const todoRouter = require('./routes/todo.router.js');
const notesRouter = require('./routes/notes.router.js');
const notesBoolRouter = require('./routes/notesStatus.router.js');
const PORT = process.env.PORT || 5001;

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/todo', todoRouter);
app.use('/notes', notesRouter);
app.use('/notesStatus', notesBoolRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});