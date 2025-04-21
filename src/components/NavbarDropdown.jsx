import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { useTheme } from "../context/ThemeContext";
import { FaUser } from "react-icons/fa";


export default function NavbarDropdown() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { darkMode, toggleDarkMode } = useTheme();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={styles.container}>
      <FaUser style={styles.icon} onClick={() => setShowDropdown((prev) => !prev)}>
      </FaUser>

      {showDropdown && (
        <div ref={dropdownRef} style={styles.dropdown}>
          <button
            style={styles.item}
            onClick={() => {
              toggleDarkMode();
              setShowDropdown(false);
            }}
          >
            {darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
          </button>

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setShowDropdown(false)}
                style={styles.item}
              >
                Perfil
              </Link>
              <button
                style={styles.item}
                onClick={() => {
                  handleLogout();
                  setShowDropdown(false);
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setShowDropdown(false)}
                style={styles.item}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                onClick={() => setShowDropdown(false)}
                style={styles.item}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    background: "#444",
    color: "white",
    borderRadius: "6px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    minWidth: "160px",
    zIndex: 100,
  },
  item: {
    background: "none",
    border: "none",
    color: "white",
    padding: "6px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "14px",
  },
  itemTitle: {
    padding: "4px 6px",
    fontWeight: "bold",
    fontSize: "13px",
    marginBottom: "5px",
    borderBottom: "1px solid #666",
  },
  icon: {
    fontSize: "18px",
    verticalAlign: "middle",
    marginLeft: "10px",
    cursor: "pointer",
  }
};
