import Link from "next/link";
import { FaDog, FaQuestionCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <h2>
            <Link href="/" className="secondary">
              <FaDog /> Next Dog App
            </Link>
          </h2>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/about" className="secondary">
            <FaQuestionCircle /> About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
