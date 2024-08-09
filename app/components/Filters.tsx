"use client";

import React, { useRef, useState } from "react";
import Selector from "./Selector";
import { fetchDogs } from "../utils/utils";

interface Props {
  breedList: string[];
  handleLoadDogsImages: (data: string[]) => void;
  handleSetLoading: (status: boolean) => void;
}

const Filters = ({
  breedList,
  handleLoadDogsImages,
  handleSetLoading,
}: Props) => {
  const [subBreeds, setSubBreeds] = useState<string[]>([]);
  const [selecteds, setSelecteds] = useState<string[]>([]);

  const [currBreed, setCurrBreed] = useState("");
  const [currSubBreed, setCurrSubBreed] = useState("");

  const breedsKeys = Object.keys(breedList);

  const handleBreedChange = (selection: string) => {
    setCurrBreed(selection);
    setCurrSubBreed("");
    let subBreedsList = [];
    breedList = Object(breedList)[selection];
    setSubBreeds(breedList);
  };

  const handleSubBreedChange = (selection: string) => {
    //console.log("handle change", selection);
    setCurrSubBreed(selection);
  };

  const handleAddSelection = () => {
    let currentSelection = `${currBreed}/${currSubBreed}`;
    if (!currentSelection.endsWith("/")) currentSelection += "/";
    if (
      currentSelection.length > 1 &&
      selecteds.indexOf(currentSelection) === -1
    )
      setSelecteds([...selecteds, currentSelection]);
  };

  const onLoadDogsGallery = async (selecteds: string[]) => {
    handleSetLoading(true);
    let calls: any[] = [];
    selecteds.map((selection) => {
      calls.push(fetchDogs(selection, 5));
    });
    let data: any[] = [];
    if (calls.length > 0) {
      Promise.all(calls).then((values) => {
        values.map((item) => {
          data = data.concat(item);
        });
        handleLoadDogsImages(data);
        handleSetLoading(false);
      });
    } else {
      handleLoadDogsImages(data);
      handleSetLoading(false);
    }
  };

  return (
    <>
      <div className="grid">
        <div className="cell">
          <Selector
            data={breedsKeys}
            label="Choose a Breed:"
            handleOnChange={handleBreedChange}
          />
        </div>
        <div className="cell">
          <Selector
            data={subBreeds}
            label="Choose a Sub Breed:"
            handleOnChange={handleSubBreedChange}
          />
        </div>
      </div>
      <div className="grid">
        <div className="cell">
          <button
            className="button is-link"
            onClick={() => handleAddSelection()}
          >
            Add Selection
          </button>
        </div>
      </div>

      <div className="grid">
        <div className="cell">
          <Selector data={selecteds} label="Your Choices:" multiple={true} />
        </div>
      </div>

      <button
        className="button is-info"
        onClick={() => {
          setSelecteds([]);
          handleLoadDogsImages([]);
          if (subBreeds.length === 0) setCurrSubBreed("");
        }}
      >
        Clear selection
      </button>
      <button
        className="button is-link mx-1"
        onClick={() => onLoadDogsGallery(selecteds)}
      >
        Fetch images
      </button>
    </>
  );
};

export default Filters;
