"use client";
import { useState } from "react";
import Filters from "./components/Filters";
import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import useBreeds from "./hooks/useBreeds";

export default function Home() {
  const { breeds, error } = useBreeds();
  const [dogImages, setDogImages] = useState<string[]>([]);
  const handleLoadDogsImages = (selecteds: string[]) => {
    setDogImages(selecteds);
  };
  return (
    <>
      <Navbar />
      <main className="container">
        <Filters
          breedList={breeds}
          handleLoadDogsImages={setDogImages}
        ></Filters>
        <Gallery dogImages={dogImages}></Gallery>
      </main>
      <footer>Create by Nelson Rojas</footer>
    </>
  );
}
