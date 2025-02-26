import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Logout from "./components/Logout";
import SearchResults from "./components/SearchResults";

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <ChakraProvider value={defaultSystem}>
      <Router>
        {isLoggedIn && <NavBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;