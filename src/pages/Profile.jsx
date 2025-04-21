import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc, setDoc} from "firebase/firestore";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.uid) return;
  
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
  }, [user?.uid]);
  

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { name, lastname }, { merge: true });

      alert("Perfil actualizado con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error al guardar perfil:", error);
      alert("Hubo un problema al guardar los cambios.");
    }
  };

  if (!user) return <Navigate to="/login" replace />;
  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
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
