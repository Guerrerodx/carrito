import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.container}>
      <h2>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul style={styles.list}>
            {cart.map((item) => (
              <li key={item.id} style={styles.item}>
                <img src={item.image} alt={item.title} style={styles.image} />
                <div style={styles.info}>
                  <h4>{item.title}</h4>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <button onClick={() => dispatch(removeFromCart(item.id))} style={styles.remove}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <p style={styles.total}>Total: ${total.toFixed(2)}</p>
          <div style={styles.actions}>
            <button onClick={() => dispatch(clearCart())} style={styles.clear}>Vaciar carrito</button>
            <button onClick={() => navigate("/checkout")} style={styles.checkout}>Finalizar compra</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 800,
    margin: "0 auto",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "1px solid #ccc",
    paddingBottom: 10,
  },
  image: {
    height: 60,
    marginRight: 15,
  },
  info: {
    flexGrow: 1,
  },
  remove: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
  total: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "right",
    marginTop: 20,
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  },
  clear: {
    backgroundColor: "#757575",
    color: "white",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
  },
  checkout: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
  },
};
