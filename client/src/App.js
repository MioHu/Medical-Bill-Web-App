import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./views/Home";
import Add from "./views/Add";
import Open from "./views/Open";
import Login from "./views/Login";
import Signup from "./views/Signup";

function App() {
  const navigate = useNavigate();

  const [billList, setBillList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const signup = user => {
    userList.push(user);
    setCurrentUser(user.email);
    navigate("/");
  }
  const login = email => {
    setCurrentUser(email);
    navigate("/");
  }
  const logout = () => {
    setCurrentUser(null);
    navigate("/");
  }

  return (
    <div className="container py-3">
      <Routes>
        <Route path="/" element={<Home billList={billList} currentUser={currentUser} handleLogout={logout}/>} />
        <Route path="/add" element={currentUser===null ? <Login userList={userList} handleLogin={login}/> : <Add billList={billList} currentUser={currentUser}/>} />
        <Route path="/open/:id" element={<Open billList={billList}/>} />
        <Route path="/login" element={<Login userList={userList} handleLogin={login}/>} />
        <Route path="/signup" element={<Signup userList={userList} handleSignup={signup}/>} />
      </Routes>
    </div>
  );
}

export default App;
