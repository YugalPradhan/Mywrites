import React,{useState,createContext} from "react";
const NoteContext=createContext();
const NoteState=(props)=>{
  const host="https://nodebackend-p6uz.onrender.com"
    const notesInitial=[]
    const [notes, setnotes] = useState(notesInitial)
  
//get all nodes
const getnotes=async ()=>{
  const response = await fetch(
    `${host}/api/notes/fetchallnotes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
    });
    const json=await response.json()
    setnotes(json);
}

    //add note
const addnote=async (title,description,tag)=>{
  const response = await fetch(
    `${host}/api/notes/addnote`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    }
  );
  const note=await response.json();
  setnotes(notes.concat(note))
}
     
    //delete note
    const deletenote=async (id)=>{
      const response = await fetch(
        `${host}/api/notes/deletenote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          }
        }
      );
      const json=await response.json();
      console.log(json)
      const newNotes=notes.filter((note)=>{return note._id!==id})
    setnotes(newNotes);
    }
    //edit note
    const editnote=async (id,title,description,tag)=>{
      const response = await fetch(
        `${host}/api/notes/updatenote/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})
        }
      );
      const json=await response.json()
      setnotes(json);
      let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element=newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes)
    }
    
return(<NoteContext.Provider value={{notes,addnote,deletenote,editnote,getnotes}}>
    {props.children}
</NoteContext.Provider>
)}
export default NoteState;
export {NoteContext};