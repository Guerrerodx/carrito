import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

test("renderiza formulario de login", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  // Verifica que los campos estén en pantalla
  expect(screen.getByPlaceholderText(/correo electrónico/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
  expect(screen.getByText(/ingresar/i)).toBeInTheDocument();
});
