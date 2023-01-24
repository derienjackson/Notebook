const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);

  if (filteredNotes.length === notes.length) {
    console.log(chalk.red.inverse('No note Found!'));
  } else {
    console.log(chalk.green.inverse('Note removed!'));
    saveNotes(filteredNotes);
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse('Your notes:'));
  notes.forEach((note) => console.log(note.title));
};

const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => note.title === title);

  if (noteToRead) {
    console.log(chalk.blue.inverse(noteToRead.title));
    console.log(noteToRead.body);
  } else {
    console.log(chalk.red.inverse('No note found!'));
  }
};

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', notesJSON);
};

const loadNotes = () => {
  try {
    const dataJSON = fs.readFileSync('notes.json').toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
