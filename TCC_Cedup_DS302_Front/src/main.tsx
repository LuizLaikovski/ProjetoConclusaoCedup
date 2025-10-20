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
import ProfileUser from './routes/ProfileUser.tsx';
import ProfileAutor from './routes/ProfileAuthor.tsx';
import Register from './routes/Register.tsx';
import SearchResult from './routes/SearchResult.tsx';

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/home" replace /> },
  {
    path: "/home",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "livro/:bookName", element: <BookSpecifications />, errorElement: <ErrorPage /> },
      { path: "*", element: <ErrorPage /> }
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <Register /> },
  { path: "/search/:bookName", element: <SearchResult /> },
  { path: "/perfil", element: <ProfileUser /> },
  { path: "/perfilAutor/:authorName", element: <ProfileAutor /> },
  {
    path: "/catalogo",
    element: <App />,
    children: [
      { index: true, element: <Catalog /> },
      { path: "livro/:bookName", element: <BookSpecifications /> },
      { path: "*", element: <ErrorPage /> }
    ]
  },
  { path: "*", element: <ErrorPage /> }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);