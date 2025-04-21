# 🛒 Carrito App

Aplicación web de comercio electrónico desarrollada como SPA con autenticación, consumo de API RESTful y manejo global de estado. Este proyecto cumple con todos los requisitos técnicos exigidos en el encargo académico.

---

## 🚀 Tecnologías utilizadas

- ⚛️ React 20 (SPA)
- 🔐 Firebase Authentication
- 🔄 Redux Toolkit (manejo de estado global)
- 🌐 React Router DOM (rutas dinámicas)
- 📡 Fake Store API (productos dinámicos)
- 🎨 Diseño responsivo y accesible (CSS puro)
- 🧪 React Testing Library (pruebas básicas)

---

## 🧰 Funcionalidades principales

- Registro e inicio de sesión con Firebase
- Navegación protegida por autenticación (`/profile`, `/checkout`)
- Listado de productos dinámicos desde API externa
- Carrito de compras funcional (agregar, eliminar, totalizar)
- Confirmación de compra con vaciado automático del carrito
- Visualización del perfil del usuario autenticado
- Diseño adaptable y accesible en distintos dispositivos
- Pruebas automatizadas que validan funcionalidades clave

---

## 📦 Instalación local

```bash
git clone https://https://github.com/Guerrerodx/carrito
cd carrito
npm install
npm start
```

## 🧪 Ejecutar pruebas

Este proyecto utiliza **Jest** y **React Testing Library** para realizar pruebas unitarias.  
Para ejecutarlas localmente, sigue estos pasos:

```bash
# Ejecuta todas las pruebas
npm test