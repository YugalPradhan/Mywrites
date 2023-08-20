import React,{useContext,useState} from 'react'
import { NoteContext } from "../context/notes/noteState";

const AddNote = (props) => {
    const context =useContext(NoteContext)
    const {addnote}=context;
    const [note, setnote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
addnote(note.title,note.description,note.tag);
setnote({title:"",description:"",tag:""})
props.showAlert("Note has been updated successfully","success")
    }
    const onChange=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
    }
  return (
<div>
    <h2 >
      Add Note
    </h2>
    <form>
<div className="mb-3">
  <label htmlFor="title"  className="form-label">Title</label><span style={{color:"red"}}>*</span>
  <input  type="text" maxLength={15} required={true} placeholder="Required" value={note.title} className="inputItem" id="title" name="title" onChange={onChange}/>
  </div>
<div className="mb-3">
  <label htmlFor="description"  className="form-label">Description</label>
  <textarea  rows={6} className="inputItem description" value={note.description} name="description" onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="text" maxLength={15} className="inputItem" id="tag" name="tag" value={note.tag} onChange={onChange}/>
</div>
<button type="submit"style={{backgroundColor:"#1f0924"}} disabled={note.title.length<=0 } className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form></div>
  )
}

export default AddNote