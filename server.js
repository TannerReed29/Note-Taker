    // Dependencies 
const express = require('express');
const path = require('path');
const fs = require('fs');

    // const for saved notes json 
const notesdb = require('./db/db.json');

    // tell node an express server is being created
const app = express();

    // set initial port with support for heroku
const PORT = process.env.PORT || 3001;

    // set up app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));




    // Routes 
app.get('/api/notes', (req, res) => 
{
    res.json(notesdb.slice(1));
});

app.get('/', (req, res) => 
{
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/notes', (req, res) => 
{
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => 
{
    res.sendFile(path.join(__dirname, './public/index.html'));
});




    // function to handle new notes being added to db, html, and assigning id
function addNote (body, notesArr)
    {
    const newNote = body;

    if(!Array.isArray(notesArr))
    notesArr = [];
    
    if (notesArr.length === 0)
    notesArr.push(0);
    body.id = notesArr[0];
    notesArr[0]++;
    notesArr.push(newNote);
    fs.writeFileSync
        (
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArr, null, 2)
        );
    return newNote;
    }

    


    // API and HTML POST 
app.post('/api/notes', (req, res) => 
{
    const newNote = addNote(req.body, notesdb);
    res.json(newNote);
});



    // Listener "starts" the server
app.listen(PORT, () => 
{
    console.log(`API server now on port ${PORT}!`);
});
