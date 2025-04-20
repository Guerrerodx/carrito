import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await updateProfile(user, {
        displayName: `${name} ${lastname}`,
      });
  
      console.log("Usuario autenticado, intentando guardar en Firestore");
  
      await setDoc(doc(db, "users", user.uid), {
        name,
        lastname,
        email: user.email,
      });
  
      console.log("Documento guardado correctamente");
  
      dispatch(login({ uid: user.uid, email: user.email }));
      navigate("/login");
    } catch (err) {
      console.error("Error en el registro:", err);
      setError("Error al registrar usuario. Intenta nuevamente.");
    }
  };
  

  return (
    <div style={styles.container}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Crear cuenta</button>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>¡Cuenta creada exitosamente! Redirigiendo...</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 400,
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: 10,
    fontSize: 16,
  },
  button: {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
};
