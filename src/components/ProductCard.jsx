import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button
        style={styles.button}
        onClick={() => dispatch(addToCart(product))}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
  },
  image: {
    height: 120,
    objectFit: "contain",
    marginBottom: 10,
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};
