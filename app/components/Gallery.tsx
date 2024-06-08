import "flexboxgrid/css/flexboxgrid.css";

interface Props {
  dogImages: string[];
  isLoading?: boolean;
}
const Gallery = ({ dogImages, isLoading = false }: Props) => {
  const getBreedInfo = (url: string) => {
    let breedInfo = url.replace("https://images.dog.ceo/breeds/", "");
    breedInfo = breedInfo.substring(0, breedInfo.lastIndexOf("/"));
    return breedInfo;
  };
  return (
    <>
      <hr />
      {isLoading && <span aria-busy="true">Loading images...</span>}
      <div className="row">
        {dogImages.map((url: string) => (
          <article
            className="col-xs-12
                col-sm-8
                col-md-6
                col-lg-4"
            key={url}
          >
            <img src={url} alt="dog" />
            <footer>{getBreedInfo(url)}</footer>
          </article>
        ))}
      </div>
    </>
  );
};

export default Gallery;
