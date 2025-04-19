import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirm = () => {
    alert("¡Compra confirmada! Gracias por tu pedido.");
    dispatch(clearCart());
    navigate("/");
  };

  if (!user) {
    return <p style={styles.error}>Debes iniciar sesión para finalizar la compra.</p>;
  }

  return (
    <div style={styles.container}>
      <h2>Resumen de compra</h2>
      <p><strong>Usuario:</strong> {user.email}</p>
      <ul style={styles.list}>
        {cart.map((item) => (
          <li key={item.id} style={styles.item}>
            {item.title} x {item.quantity} = ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <p style={styles.total}><strong>Total:</strong> ${total.toFixed(2)}</p>
      <button onClick={handleConfirm} style={styles.confirm}>Confirmar compra</button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 600,
    margin: "0 auto",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    marginBottom: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  confirm: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: 20,
  },
  error: {
    textAlign: "center",
    marginTop: 50,
    color: "red",
    fontWeight: "bold",
  },
};
