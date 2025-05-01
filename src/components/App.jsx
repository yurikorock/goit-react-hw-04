import { useState, useEffect, useRef } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImagesByQuery } from "./helpers/unsplashApi.js";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./ImageModal/ImageModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const loadMoreBtnRef = useRef(null);
  const [hasMoreImage, setHasMoreImage] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = (newSearch) => {
    setQuery(newSearch);
    setPage(1);
    setImages([]);
    setHasMoreImage(true);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (images.length > 0 && loadMoreBtnRef.current) {
      loadMoreBtnRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [images]);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchImagesByQuery(query, page);

        if (data.length === 0) {
          setHasMoreImage(false);
          if (page === 1) {
            toast.error("Зображення не знайдено");
          }
          return;
        }

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
      {!error && !isLoading && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && hasMoreImage && (
        <LoadMoreBtn onClick={handleLoadMore} innerRef={loadMoreBtnRef} />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default App;
