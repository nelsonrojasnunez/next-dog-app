import { FaDog, FaQuestionCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <h1 className="title">
          <FaDog /> Next Dog App
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
