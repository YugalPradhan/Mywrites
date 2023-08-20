import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoteContext } from "../context/notes/noteState";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
const Notes = (props) => {
  let navigate = useNavigate();
  let count=0;
  const { notes, getnotes, editnote } = useContext(NoteContext);
  useEffect(() => {
    if (localStorage.getItem("token")) getnotes()
    else {
      navigate("/login");
    }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    refClose.current.click();
    editnote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Note has been updated successfully", "success");
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div  id="parent">
        <div id="left">
          <AddNote showAlert={props.showAlert} />
          <button
            type="button"
            style={{ display: "none" }}
            ref={ref}
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          ></button></div>
          <div  id="right">
          <h2 style={{color:"white"}}>My Notes</h2>
          <div id="notebox">
          {notes.length===0 && <div style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"auto",flexWrap:"wrap"}}><h1 className="mx-3">¯\_(ツ)_/¯ </h1><h6 className="mx-3 my-2" style={{textAlign:"center"}}>No notes to display, please add some.</h6></div>}
          {notes.map((note) => {
            count++;
            return (
              <NoteItem
                key={note._id}
                updateNote={updateNote}
                showAlert={props.showAlert}
                note={note}
                count={count}
              />
            );
          })} 
          </div>
          </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <span style={{color:"red"}}>*</span>
                  <input
                    type="text"
                    className="inputItem"
                    value={note.etitle}
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    maxLength={15}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    className="inputItem description"
                    value={note.edescription}
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="inputItem"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    maxLength={15}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-info"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                disabled={note.etitle.length <= 0}
                onClick={handleClick}
                className="btn btn-primary"
                style={{backgroundColor:"#1f0924"}}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
