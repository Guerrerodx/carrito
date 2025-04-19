import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state) => state.user.user);

  // Si el usuario no está logueado, redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={styles.container}>
      <h2>Mi Perfil</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>ID de Usuario:</strong> {user.uid}</p>
      <p style={{ marginTop: 20, color: "#888" }}>
        Próximamente podrás editar tu perfil aquí. 😉
      </p>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 600,
    margin: "0 auto",
  },
};
