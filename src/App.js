// import './App.css';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import About from './components/About';
// import Home from './components/Home';
// import Navbar from './components/Navbar';
// import Alert from './components/Alert';
// import AddNote from './components/AddNote';
// import NoteState from "./context/notes/NoteState";
// import Login from './components/Login';
// import SignUp from './components/SignUp';



// function App() {
//   const location = useLocation();

//   // Agar login ya signup page par ho to navbar hide kar do
//   const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";
//   return (
//     <>
//       <NoteState>
//         {!hideNavbar && <Navbar />}
//         {/* <Alert message="iNotebook Frontend"/> */}

//         <Routes>
//           <Route path="/" element={<Navigate to="/about" />} />
//           {/* <Route exact path="/" element={<Home />} /> */}
//           <Route path="/" element={
//             localStorage.getItem("token") ? <Home /> : <Login />
//           } />
//           {/* <Route exact path="/addNote" element={<AddNote />} /> */}
//           <Route
//             path="/addnote"
//             element={
//               localStorage.getItem("token") ? (
//                 <AddNote />
//               ) : (
//                 <h3 style={{ textAlign: "center", marginTop: "20px" }}>
//                   Please login to add your notes
//                 </h3>
//               )
//             }
//           />
//           <Route exact path="/about" element={<About />} />
//           <Route exact path="/Login" element={<Login />} />
//           <Route exact path="/SignUp" element={<SignUp />} />
//         </Routes>
//       </NoteState>
//     </>
//   );
// }

// export default App;


import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddNote from './components/AddNote';
import NoteState from "./context/notes/NoteState";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Notes from './components/Notes';
// import Profile from './components/Profile';
import Setting from './components/Setting';
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import Account from './components/Account';
import Personal from './components/Personal';
import DeleteAccount from './components/DeleteAccount';
import AdminFetchAllUsers from './components/AdminFetchAllUsers';

function App() {
  const location = useLocation();

  // agar login ya signup page par ho to navbar hide karo
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <NoteState>

      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/about" />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addnote"
          element={
            <ProtectedRoute>
              <AddNote />
            </ProtectedRoute>
          }
        />

        <Route path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route path="/AdminFetchAllUsers"
          element={
            <ProtectedRoute>
              <AdminFetchAllUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        >
          <Route path="account" element={<Account />} />
          <Route path="personal" element={<Personal />} />
        </Route>


        {/* Public routs */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/DeleteAccount" element={<DeleteAccount />} />


      </Routes>

    </NoteState>
  );
}

export default App;