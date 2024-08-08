import { capitalize } from "./Selector";
interface Props {
  dogImages: string[];
  isLoading?: boolean;
}

export const getBreedInfo = (url: string) => {
  let breedInfo = url.replace("https://images.dog.ceo/breeds/", "") || "";
  breedInfo = breedInfo.replaceAll("-", " ");
  breedInfo = breedInfo.substring(0, breedInfo.lastIndexOf("/"));
  return capitalize(breedInfo);
};

const Gallery = ({ dogImages, isLoading = false }: Props) => {
  return (
    <>
      <hr />
      {dogImages.length === 0 && (
        <span>Please add any selection and press "Fetch images" button</span>
      )}
      {isLoading && <span aria-busy="true">Loading images...</span>}
      <div className="fixed-grid has-3-cols has-1-cols-mobile">
        <div className="grid">
          {dogImages.map((url: string) => (
            <div className="cell" key={url}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-5by4">
                    <img src={url} alt="dog" />
                  </figure>
                </div>
                <div className="card-content">{getBreedInfo(url)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
