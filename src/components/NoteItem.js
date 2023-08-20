import React, { useContext } from 'react'
import { NoteContext } from "../context/notes/noteState";

const NoteItem = (props) => {
  const {deletenote}=useContext(NoteContext)
   const  {note,updateNote,count}=props;
  return (
    <div className={`card my-3 noteitem color${count%6}`}>
  <div className="card-body">
    <div className='d-flex' id="icons">
    <h6 className="card-title">{note.title}</h6>
    <i className="fa-solid fa-trash " style={{cursor:"pointer"}} id="i1" onClick={()=>{deletenote(note._id);
    props.showAlert("note has been deleted successfully","success")}}></i>
    <i className="fa-solid fa-pen-to-square" style={{cursor:"pointer"}} id="i2" onClick={()=>{updateNote(note)}}></i>
    </div>
    <p className="card-text">{note.description}</p>
  </div>
  {note.tag && <div className='tag' style={{backgroundColor:"rgb(0, 42, 59)",borderRadius:"6px",color:"white",position:"absolute",bottom:"2px",margin:"10px 0px 2px 10px",fontWeight:"500"}}>#{note.tag}</div>}
</div>

  )
}

export default NoteItem