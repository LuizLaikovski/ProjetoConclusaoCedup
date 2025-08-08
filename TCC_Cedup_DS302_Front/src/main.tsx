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
        path: "livro/:bookName",
        element: <BookSpecifications />,
        errorElement: <ErrorPage />
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Register />
  },
  {
    path: "/catalogo",
    element: <App />, // Usando o mesmo layout principal
    children: [
      {
        index: true,
        element: <Catalog />,
      },
      {
        path: "livro/:bookName", // Rota direta sem aninhamento desnecessário
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
    element: <ErrorPage />,
  }
]);

AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false,
  offset: 100,
  anchorPlacement: 'top-bottom'
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);