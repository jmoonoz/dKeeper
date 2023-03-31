import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      // passes the infomration to the main.mo file where itll be stored in list and accessable to the back end
      dkeeper.createNote(newNote.title, newNote.content);
      return [...prevNotes, newNote];
    });
  }

  // this will help retreive stored data from the canister
  useEffect(() => {
    console.log("use effect triggered");
    fetchData();
  }, []);

  // from within the use Effect
  async function fetchData() {
    // goes into main.mo file and taps into the read notes stored file
    // it will wait for all the notes to arrive
    const notesArray = await dkeeper.readNotes();

    // adds the array of notes retreived from the canister to the
    setNotes(notesArray);
  }



  function deleteNote(id) {

    // goesinto the canister and deletes the node with id
    dkeeper.removeNote(id);

    setNotes((prevNotes) => {
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
