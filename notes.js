const fs = require('fs');
const chalk = require('chalk');

const addNote = function(title, body){
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title;
    });
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("\nNew note added successfully!\n"));
    }
    else{
        console.log(chalk.red.inverse("Title already taken!"));
    }
}

const removeNote = function(title){

    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse("Note removed!"));
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse("Note not found!"));
    }

}

const listNotes = function(){
    const notes = loadNotes()
    
    console.log(chalk.green.inverse("Your Notes:-"));

    notes.forEach((note) => {
        console.log(chalk.yellow(note.title))
    });
}

const showNotes = function(){
    const notes = loadNotes()
    
    console.log(chalk.green.inverse(" *** All Notes *** "));

    notes.forEach((note) => {
        console.log("Title : " + chalk.yellow(note.title) + " Body : " + chalk.blue(note.body))
    });
}

const readNote = function(title){
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.yellow(note.title) + " : " + chalk.blue(note.body));
    }
    else{
        console.log(chalk.red.inverse("Note not found!"));
    }
}


const loadNotes = function() {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return []
    }
}

const saveNotes = function(notes)  {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote,
    showNotes : showNotes
}