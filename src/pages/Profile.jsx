import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setName(data.name || "");
        setLastname(data.lastname || "");
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        name,
        lastname
      });
      alert("Perfil actualizado con éxito");
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      alert("Hubo un problema al guardar los cambios.");
    }
  };
  
  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Mi Perfil</h2>
  
      <p><strong>Email:</strong> {user.email}</p>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
  
      <button onClick={handleSave}>Guardar cambios</button>
    </div>
  );
  
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 400,
    margin: "0 auto",
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  button: {
    padding: 10,
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};
