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
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.jsx";

const App = () => {
  const [query, setQuery] = useState(""); //стан запиту в інпуті
  const [images, setImages] = useState([]); // стан галереї
  const [error, setError] = useState(false); // стан HTTP запиту
  const [isLoading, setIsLoading] = useState(false); //стан лоадера
  const [errorMessage, setErrorMessage] = useState(""); // стан сповіщення про помилку завантаження зображень
  const [page, setPage] = useState(1); // стан сторінки зображень

  const handleSearch = (newSearch) => {
    setQuery(newSearch);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setIsLoading(true);
    try {
      const data = await fetchImagesByQuery(query, nextPage);
      setImages((prevImages) => [...prevImages, ...data]);
      if (data.length === 0) {
        toast.error("No more images to load!");
      }
    } catch (error) {
      setError(true);
      setErrorMessage("Сталася помилка при завантаженні зображень!");
      toast.error("Error fetching images");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchImagesByQuery(query, page);
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (error) {
        setError(true);
        setErrorMessage("Сталася помилка при завантаженні зображень!");
        toast.error("Error fetching images");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  return (
    <div>
      <h1 className="title">Picture Search</h1>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage message={errorMessage} />}
      {isLoading && <Loader />}
      {!error && !isLoading && <ImageGallery images={images} />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};
export default App;
