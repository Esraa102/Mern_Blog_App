import { Routes, Route } from "react-router-dom";
import { Home, Login, Profile, Register } from "./pages";
import { Header, Footer } from "./components";
import { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
function App() {
  const [cookies] = useCookies(["access_token"]);
  console.log("cookies", cookies);
  return (
    <>
      <Header />
      <div className="bg-[#0B1120] min-h-screen text-white transition-all">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster />
      </div>
      <Footer />
    </>
  );
}

export default App;
