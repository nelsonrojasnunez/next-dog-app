"use client";

export async function fetchDogs(breeds: string, numberOfDogs: number) {
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breeds}images/random/${numberOfDogs}`
    );
    if (!response.ok) {
      throw new Error("Network response for fetching dogs was not ok");
    }
    const data = await response.json();
    console.log("** DOGS **", data.message);
    return data.message;
  } catch (error) {
    console.error(error);
    return [];
  }
}
