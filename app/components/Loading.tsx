import { FaPersonSkating, FaPersonPraying } from "react-icons/fa6";

const Loading = () => {
  const num = Math.floor(Math.random() * 10);
  return (
    <div className="is-primary has-text-right">
      {num > 5 ? (
        <FaPersonPraying className="mx-2" />
      ) : (
        <FaPersonSkating className="mx-2" />
      )}
      Loading content... please wait...
    </div>
  );
};

export default Loading;
