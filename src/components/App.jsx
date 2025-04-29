//App.jsx

import { useState, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImagesByQuery } from "./helpers/unsplashApi.js";
import Loader from "./Loader/Loader";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = (newSearch) => {
    setQuery(newSearch);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      try {
        const data = await fetchImagesByQuery(query);
        setImages(data);
      } catch (error) {
        toast.error("Error fetching images");
        console.error(error);
      }
    };

    fetchImages();
  }, [query]);

  return (
    <div>
      <h1 className="title">Picture Search</h1>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      <ImageGallery images={images} />
      <Loader />
    </div>
  );
};
export default App;
