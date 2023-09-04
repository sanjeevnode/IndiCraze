import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Routes, Route ,Navigate} from 'react-router-dom'
import React,{useState} from 'react'
import AddItem from "./components/AddItem";
import Edit from "./components/Edit";


function App() {
  const [isLoggedIn, setIsLoggedIn]  =useState(
       sessionStorage.getItem("isLoggedIn") || false
    );
  return (
    <div>
      <Navbar  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={ isLoggedIn  ? <Home /> : <Navigate to='/'/>} />
        <Route path="/additem" element={ isLoggedIn  ? <AddItem /> : <Navigate to='/'/>} />
        <Route path="/update" element={ isLoggedIn  ? <Edit /> : <Navigate to='/'/>} />

      </Routes>
    </div>
  );
}

export default App;
