export const capitalize = (str: string) => {
    str = str.toLowerCase().replace(/\b[a-z]/g, function (ch) {
      return ch.toUpperCase();
    });
    return str;
  };

export const getBreedInfo = (url?: string) => {
    let breedInfo = url || "";
    breedInfo = breedInfo.replace("https://images.dog.ceo/breeds/", "");
    breedInfo = breedInfo.replaceAll("-", " ");
    breedInfo = breedInfo.substring(0, breedInfo.lastIndexOf("/"));
    return capitalize(breedInfo);
  };

export const fetchDogs = async (breed: string, count: number): Promise<string[]> => {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}images/random/${count}`);
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error(error);
    return [];
  }
};