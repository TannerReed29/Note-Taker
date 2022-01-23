const express = require('express');
const path = require('path');
const fs = require('fs');
const notesdb = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));





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

    



app.post('/api/notes', (req, res) => 
{
    const newNote = addNote(req.body, notesdb);
    res.json(newNote);
});




app.listen(PORT, () => 
{
    console.log(`API server now on port ${PORT}!`);
});
