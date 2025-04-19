import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: 20 }}>Productos</h2>
      <ProductList />
    </div>
  );
}
