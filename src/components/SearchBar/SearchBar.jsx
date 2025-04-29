import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const search = formData.get("search");
    if (search.trim() === "") {
      toast.error("Необхідно ввести текст для пошуку зображень!", {
        duration: 1500,
        position: "top-right",
      });
      return;
    }

    event.currentTarget.reset();

    onSubmit(search);
    setQuery("");
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}
