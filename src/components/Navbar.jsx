import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>Carrito - Frontend</h2>
      <div style={styles.links}>
        <Link style={styles.link} to="/">Inicio</Link>
        <Link style={styles.link} to="/cart">
          <FaShoppingCart /> ({totalItems})
        </Link>
        <NavbarDropdown user={user} />
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "white",
    padding: "10px 20px",
  },
  title: {
    margin: 0,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};
