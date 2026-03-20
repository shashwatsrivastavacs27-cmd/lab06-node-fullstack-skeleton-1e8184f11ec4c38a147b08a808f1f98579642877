import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          user ? <Dashboard user={user} setUser={setUser} /> : <Login setUser={setUser} />
        } />

        <Route path="/users" element={
          user ? <Users user={user} /> : <Login setUser={setUser} />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;