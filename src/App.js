import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashBoard, Profile, SignUP, LogIn } from "./pages";
import { useAuth } from "./hooks/user-auth";
import userContext from "./context/userContext";
import ProtectedRoute from "./helper/ProtectedRoute";
import ModalContextProvider from "./context/ModalContext";
import { HeaderLayout } from "./components";

import { Header } from "./components";
function App() {
  const { user } = useAuth();
  return (
    <userContext.Provider value={{ user }}>
      <ModalContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute user={user} />}>
              <Route element={<HeaderLayout />}>
                <Route index path="/" element={<DashBoard />}></Route>
                <Route path="/p/:username" element={<Profile />}></Route>
                <Route
                  path="/p/not-found"
                  element={
                    <div className="flex uppercase justify-center mt-5 text-2xl font-extrabold">
                      Not Found
                    </div>
                  }
                ></Route>
              </Route>
            </Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="/signup" element={<SignUP />}></Route>
          </Routes>
        </Router>
      </ModalContextProvider>
    </userContext.Provider>
  );
}

export default App;
