import { useEffect, useState } from "react";
import { getUser } from "../services/auth_services.js";
import { getNotes } from "../services/notes_service.js";
const UserFindHook = () => {
  const [user, setUser] = useState([]);
const [notes, setNotes] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        setUser(res.user);

        if(res.user) { 
        localStorage.setItem("user",JSON.stringify(res.user))
        }
 const notes = await getNotes(user._id)
 setNotes(notes.data)

      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [user._id]);

  return { user, notes };
};

export default UserFindHook;
