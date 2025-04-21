import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PRODUCTS_PER_PAGE = 9;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name_asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filtered = products
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "name_asc") return a.title.localeCompare(b.title);
      if (sort === "name_desc") return b.title.localeCompare(a.title);
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const currentItems = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <input
          type="text"
          placeholder="Buscar producto"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name_asc">Nombre A-Z</option>
          <option value="name_desc">Nombre Z-A</option>
          <option value="price_asc">Precio menor a mayor</option>
          <option value="price_desc">Precio mayor a menor</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
        {currentItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 5, justifyContent: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            style={{
              padding: "5px 10px",
              background: currentPage === i + 1 ? "#4caf50" : "#eee",
              border: "none",
              cursor: "pointer"
            }}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
