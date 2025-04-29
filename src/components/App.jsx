//App.jsx

import { useState, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar";

const App = () => {
  const [query, setQuery] = useState();

  const handleSearch = (newSearch) => {
    // console.log(newSearch);
  };

  return (
    <div>
      <h1 className="title">Picture Search</h1>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
    </div>
  );
};
export default App;
