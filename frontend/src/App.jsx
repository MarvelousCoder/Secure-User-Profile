import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element = {<ProtectedRoute><Profile/></ProtectedRoute>}/>
    </Routes>
  );
}

export default App;

