import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useEffect } from "react";
import { keep_notes } from "../../../declarations/keep_notes/index";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      keep_notes.createNote(newNote.title, newNote.content)
      return [...prevNotes, newNote];
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(){
    const notesArray = await keep_notes.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    keep_notes.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
