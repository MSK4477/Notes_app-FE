import { useState } from "react";
import {deleteNote, getNotes, updateNote, markAsCompleted} from "../../services/notes_service.js"
import Loader from "../../components/loader.jsx";
import toast from "react-hot-toast";
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
        toast.success("Note Edited Succesfully")
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
        toast.success("Deleted Succesfully")
    } catch (error) {
        console.log(error)
    }finally{ 
        setLoader(false)
    }
   
  }
  const markComplete = async (id, completed) => { 
    try {
      setLoader(true)
      await markAsCompleted(id)
      if(completed == false) { 
      toast.success("Marked As Complated")
      }else { 
        toast.success("Removed From Completed")
      }
      const notes = await getNotes()
      setUpdatedNotes(notes.data)
    } catch (error) {
      console.log(error)
    }finally { 
      setLoader(false)
    }
  }
  return (

    <>
   { loader ? (<Loader/>) : (<div className="flex max-sm:w-full items-center justify-between w-[80%] m-auto mt-6 bg-white p-4 rounded shadow-md mb-2">
      <div className="flex items-center">
        {editNote ? (
          <input
            className="bg-slate-300 w-[100vh] max-sm:w-[100%] px-1 py-2 border-none outline-none transition-all"
            type="text"
            value={newNote}
            onChange={(e)=> setNewNote(e.target.value)}
          />
        ) : (
          <>
            <input checked={item.completed} onClick={()=> markComplete(item._id, item.completed)} type="checkbox" className="mr-2" />

            <div className={item.completed ? "line-through" : ""}>{item.notes.length > 20 ? item.notes.substring(0, 20) + "..." : item.notes}</div>
          </>
        )}
        
      </div>
      
      {!item.completed && 
      <div className="flex items-center gap-5 space-x-2">
        <i
          onClick={() => edit(item._id)}
          className={`fas fa- ${editNote ? "fa-save" : "fa-edit"} text-blue-500 cursor-pointer`}
        ></i>
       {!editNote && <i 
        onClick={() => Delete(item._id)}
        className="fas fa-trash text-red-500 cursor-pointer"></i>}

      </div>  }

    </div>)}
    </>
  );
};

export default NotesList;
