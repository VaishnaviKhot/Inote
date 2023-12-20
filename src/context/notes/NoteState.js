import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:8080";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //get all notes
  const getNotes = async () => {
    //Todo: api call

    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //add a note
  const addNote = async (title, description, tag) => {
    //Todo: api call

    //api call
    //eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    //Todo: api call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    //eslint-disable-next-line
    const json = response.json(); // parses JSON response into native JavaScript objects


    //logic
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    //eslint-disable-next-line
    const json = await response.json(); // parses JSON response into native JavaScript objects

    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit client side
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
