import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from './routes/Login.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
import Home from './routes/Home.tsx';
import Catalog from './routes/Catalog.tsx';
import BookSpecifications from './routes/BookSpecifications.tsx';
import Register from './routes/Register.tsx';

// Importe o AOS e seu CSS
import AOS from 'aos';
import 'aos/dist/aos.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "catalogo",
        element: <Catalog />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "livro",
            element: <BookSpecifications />
          },
          {
            path: "*",
            element: <ErrorPage />
          }
        ]
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "cadastro",
    element: <Register />
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

// Inicialize o AOS antes de renderizar a aplicação
AOS.init({
  // Configurações globais:
  duration: 800,           // Duração da animação em ms
  easing: 'ease-in-out',   // Tipo de easing
  once: true,              // Anima apenas uma vez
  mirror: false,           // Não anima ao rolar para cima
  offset: 100,             // Distância do topo para trigger (px)
  anchorPlacement: 'top-bottom' // Ponto de trigger
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);