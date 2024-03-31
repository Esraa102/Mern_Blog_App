import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, Profile, Register } from "./pages";
import { Header, Footer } from "./components";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <Header />
      <div className="bg-[#0B1120] min-h-screen text-white transition-all">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile/:id"
            element={currentUser ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={!currentUser ? <Login /> : <Navigate to={"/"} />}
          />
        </Routes>
        <Toaster />
      </div>
      <Footer />
    </>
  );
}

export default App;
