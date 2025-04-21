import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import { useTheme } from "../ThemeContext";


export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const { darkMode, setDarkMode } = useTheme();
  return (
    <nav style={styles.nav}>
      <h2 style={styles.title}>Carrito - Frontend</h2>
      <div style={styles.links}>
        <Link style={styles.link} to="/">Inicio</Link>
        <Link style={styles.link} to="/cart">🛒({totalItems})</Link>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
        {user ? (
          <>
            <Link style={styles.link} to="/profile">Perfil</Link>
            <button style={styles.button} onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/login">Iniciar sesión</Link>
            <Link style={styles.link} to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#222",
    color: "white",
  },
  title: { margin: 0 },
  links: { display: "flex", gap: "15px", alignItems: "center" },
  link: { color: "white", textDecoration: "none" },
  button: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
};
