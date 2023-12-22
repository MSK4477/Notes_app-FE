import axios from "axios";
import url from "../config/url";

// Create Note
export const createNote = async (noteData) => {
  const response = await axios.post(`${url}/notes/postNotes`, noteData, { withCredentials: true });
  return response.data;
};

// Update Note
export const updateNote = async (noteId, updatedNote) => {
  const response = await axios.post(`${url}/notes/updateNotes/${noteId}`, updatedNote, { withCredentials: true });
  console.log(response)
  return response.data;
  
};

// Delete Note
export const deleteNote = async (noteId) => {
  const response = await axios.get(`${url}/notes/deleteNotes/${noteId}`, { withCredentials: true });
  return response.data;
};

// Get Notes
export const getNotes = async () => {
  const response = await axios.get(`${url}/notes/`, { withCredentials: true });
  return response.data;
};
