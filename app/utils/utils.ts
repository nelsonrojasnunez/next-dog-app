export const capitalize = (str: string) => {
    str = str.toLowerCase().replace(/\b[a-z]/g, function (letra) {
      return letra.toUpperCase();
    });
    return str;
  };

export const getBreedInfo = (url: string) => {
    let breedInfo = url.replace("https://images.dog.ceo/breeds/", "") || "";
    breedInfo = breedInfo.replaceAll("-", " ");
    breedInfo = breedInfo.substring(0, breedInfo.lastIndexOf("/"));
    return capitalize(breedInfo);
  };

