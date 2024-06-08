"use client";

import React, { useRef, useState } from "react";
import { fetchDogs } from "../actions";
interface Props {
  breedList: string[];
  handleLoadDogsImages: (selecteds: string[]) => void;
}
const Filters = ({ breedList, handleLoadDogsImages }: Props) => {
  const [subBreeds, setSubBreeds] = useState<string[]>([]);
  const [selecteds, setSelecteds] = useState<string[]>([]);
  const breedsRef = useRef<HTMLSelectElement>(null);
  const subBreedsRef = useRef<HTMLSelectElement>(null);

  const breedsKeys = Object.keys(breedList);

  const handleBreedChange = (selectedBreed: string) => {
    let subBreedsList = [];
    breedList = Object(breedList)[selectedBreed];
    setSubBreeds(breedList);
  };

  const handleAddSelection = () => {
    let currentSelection = `${breedsRef.current?.value}/${subBreedsRef.current?.value}`;
    if (!currentSelection.endsWith("/")) currentSelection += "/";
    if (currentSelection.length > 1)
      setSelecteds([...selecteds, currentSelection]);
  };

  const onLoadDogsGallery = async (selecteds: string[]) => {
    //const selection = selecteds[0] ?? "";
    let calls: any[] = [];
    selecteds.map((selection) => {
      calls.push(fetchDogs(selection, 5));
    });
    let data: any[] = [];
    if (calls.length > 0) {
      Promise.all(calls).then((values) => {
        console.log("###");
        console.log(values);
        values.map((item) => {
          data = data.concat(item);
        });
        console.log("**", data, "***");
        handleLoadDogsImages(data);
      });
    } else {
      handleLoadDogsImages(data);
    }
  };

  return (
    <>
      {/* <span aria-busy="true">Loading data...</span> */}

      <div className="grid">
        <div>
          <label htmlFor="breeds">Choose a Breed:</label>
          <select
            ref={breedsRef}
            name="breeds"
            onChange={(evt) => handleBreedChange(evt.target.value)}
          >
            {breedsKeys.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sub_breeds">Choose a Sub Breed:</label>
          <select ref={subBreedsRef} name="sub_breeds">
            {subBreeds.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="secondary" onClick={() => handleAddSelection()}>
        Add Selection
      </button>
      <div className="grid">
        <div>
          <label htmlFor="selections">Your Selections</label>
          <select name="selections" multiple>
            {selecteds.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="secondary"
        onClick={() => {
          setSelecteds([]);
          handleLoadDogsImages([]);
        }}
      >
        Clear selection
      </button>
      <button className="" onClick={() => onLoadDogsGallery(selecteds)}>
        See dogs pictures
      </button>
    </>
  );
};

export default Filters;
