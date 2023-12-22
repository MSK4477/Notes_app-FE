import { useState } from "react";
import {deleteNote, getNotes, updateNote} from "../../services/notes_service.js"
import Loader from "../../components/loader.jsx";
/* eslint-disable react/prop-types */
const NotesList = ({ item,  setUpdatedNotes, setLoader, loader }) => {
  const [editNote, setEditNote] = useState(false);
const [newNote, setNewNote] = useState(item.notes)
  const edit = async(id) => {
    setEditNote(!editNote);
    console.log(id);
    try {
        if(editNote){ 
        setLoader(true)
        await updateNote(id,{notes:newNote} )
        const notes = await getNotes()
        setUpdatedNotes(notes.data)
        }
    } catch (error) {
        console.log(error)
    }finally{
        setLoader(false)
    }
  
  
  };
  const Delete = async(id) => { 
    await deleteNote(id)
    try {
        setLoader(true)
        const notes = await getNotes()
        setUpdatedNotes(notes.data)
    } catch (error) {
        console.log(error)
    }finally{ 
        setLoader(false)
    }
   
  }
  return (

    <>
   { loader ? (<Loader/>) : (<div className="flex items-center justify-between w-[80%] m-auto mt-6 bg-white p-4 rounded shadow-md mb-2">
      <div className="flex items-center">
        {editNote ? (
          <input
            className="bg-slate-300 w-[100vh] px-1 py-2 border-none outline-none transition-all"
            type="text"
            value={newNote}
            onChange={(e)=> setNewNote(e.target.value)}
          />
        ) : (
          <>
            <input type="checkbox" className="mr-2" />

            <div>{item.notes.length > 40 ? item.notes.substring(0, 40) + "..." : item.notes}</div>
          </>
        )}
        
      </div>
      

      <div className="flex items-center gap-5 space-x-2">
        <i
          onClick={() => edit(item._id)}
          className={`fas fa- ${editNote ? "fa-save" : "fa-edit"} text-blue-500 cursor-pointer`}
        ></i>
        <i 
        onClick={() => Delete(item._id)}
        className="fas fa-trash text-red-500 cursor-pointer"></i>
      </div>

    </div>)}
    </>
  );
};

export default NotesList;
