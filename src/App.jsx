import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  Verify,
} from "./pages/userAuth/index.js";
import appContext from "./contexts/app_context.js";
import UserFindHook from "./hooks/userFindHook.js";
import NotesContainer from "./pages/notes/notes_container.jsx";
function App() {

  const {user, notes} = UserFindHook()

 
  return (
    <appContext.Provider value= {{user, notes}}>
      <>
        <Routes>
        <Route path="/" element={<Register />} />
<Route index path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/notes" element={<NotesContainer />}/>


        </Routes>
        <Toaster />
      </>
    </appContext.Provider>
  );
}

export default App;
