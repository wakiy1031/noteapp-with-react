import { useEffect, useState } from "react";
import "./App.css";
import { Main } from "./components/Main";
import { Sidebar } from "./components/Sidebar";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNote, setCurrentNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setCurrentNote(notes[0].id);
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };
  const onDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  const getCurrentNote = () => {
    return notes.find((note) => note.id === currentNote);
  };
  const onUpdateNote = (updatedNote) => {
    const updatedNoteArray = notes.map((n) =>
      n.id === updatedNote.id ? updatedNote : n
    );
    setNotes(updatedNoteArray);
  };
  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        notes={notes}
        onDeleteNote={onDeleteNote}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
      />
      <Main currentNote={getCurrentNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
