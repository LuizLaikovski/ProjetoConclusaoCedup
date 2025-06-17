import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter,Navigate,RouterProvider} from "react-router-dom";
import Login from './routes/Login.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
import Home from './routes/Home.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />, // Redireciona a raiz para /home
  },
  {
    path: "/home",
    element: <App />, // App atua como layout principal
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Rota padrão quando o path é exatamente "/home"
        element: <Home />,
      },
      {
        path: "login", // Note que não tem / no início - isso indica rota relativa
        element: <Login />,
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
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
