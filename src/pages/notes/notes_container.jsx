import { useContext, useEffect, useState } from "react";
import appContext from "../../contexts/app_context";
import { createNote,getNotes } from "../../services/notes_service";
import NotesList from "./notes_list";
import Loader from "../../components/loader";
const NotesContainer = () => {
  const { user, notes } = useContext(appContext);
  const [note, setNote] = useState("");
 const [updatedNotes, setUpdatedNotes] = useState([])
 const [loader, setLoader] = useState(false)

  useEffect(() => { 

    const fetch = async() => {
    const Notes =  await getNotes()
    setUpdatedNotes(Notes.data)
    }
    fetch()
  }, [notes, user])
 const listHeight = Boolean(updatedNotes.length > 3)
 console.log(listHeight)
const addNote = async() => { 
try {
    setLoader(true)
    await createNote({notes:note})
    const Notes =  await getNotes()
    setUpdatedNotes(Notes.data)
    
} catch (error) {
    console.log(error)
}finally{
    setLoader(false)
}
       


}
  return (
    <>
   {!loader ? (<div className="p-[4vmax] bg-slate-50">
      <div className={`relative  flex flex-col top-[30px]  w-full ${listHeight ? "h-auto" : "h-screen"} bg-slate-200`}>
        <h1 className="flex justify-center items-center mt-9 text-3xl pb-3 border-b-4 border-white text-blue-600 font-serif font-bold">
          My Notes
        </h1>

        <div
          style={{ backgroundColor: "rgb(66 66 66)" }}
          className="flex justify-center ml-[10%] h-auto  w-[80%] py-6 rounded-xl items-center mt-9"
        >
          <input
            style={{ backgroundColor: "rgb(48 48 48)", color: "white" }}
            type="text"
            placeholder="Add new.."
            value={note}
            className=" w-[77%] rounded-r-none rounded-md border-none outline-none px-1 text-lg py-3"
            onChange={(e) => setNote(e.target.value)}
          />
          <button
          onClick={addNote}
          className="bg-blue-500 py-[14px] px-1 rounded-md rounded-l-none text-white w-[10%] font-serif text-sm font-bold">
            ADD
          </button>

        </div>
       {updatedNotes.map((item) => (
<NotesList key={item.id} 
item={item}
 updatedNotes={updatedNotes}
  setUpdatedNotes={setUpdatedNotes}
  loader={loader}
  setLoader={setLoader}
  />
       ))}

      </div>

    </div>) :

    (<div className="w-full h-screen z-20 flex justify-center items-center">
    <Loader />
    </div>)}
   
    </>
  );
};
export default NotesContainer;
