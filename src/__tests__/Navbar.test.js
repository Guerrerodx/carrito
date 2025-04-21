import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../ThemeContext"; // 👈 importa tu provider de tema

test("renderiza enlaces del navbar", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider> {/* 👈 envuelve aquí también */}
          <Navbar />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
  expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument();
  expect(screen.getByText(/Registrarse/i)).toBeInTheDocument();
});
