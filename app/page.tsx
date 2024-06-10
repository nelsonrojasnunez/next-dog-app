"use client";
import { useState } from "react";
import Filters from "./components/Filters";
import Gallery from "./components/Gallery";
import Navbar from "./components/Navbar";
import useBreeds from "./hooks/useBreeds";
import Loading from "./components/Loading";

export default function Home() {
  const { breeds, error, isLoading, setIsLoading } = useBreeds();
  const [dogImages, setDogImages] = useState<string[]>([]);
  const handleLoadDogsImages = (selecteds: string[]) => {
    setDogImages(selecteds);
  };
  return (
    <>
      <Navbar />

      <Filters
        breedList={breeds}
        handleLoadDogsImages={setDogImages}
        handleSetLoading={setIsLoading}
      ></Filters>
      {isLoading === true && <Loading />}

      <Gallery dogImages={dogImages}></Gallery>

      <footer>Created by Nelson Rojas</footer>
    </>
  );
}
