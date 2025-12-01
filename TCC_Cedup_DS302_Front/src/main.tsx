import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import './App.css';
import App from './App.tsx';
import Loader from './components/Loader.tsx';
const Login = lazy(() => import('./routes/Login.tsx'));
const ErrorPage = lazy(() => import('./routes/ErrorPage.tsx'));
const Home = lazy(() => import("./routes/Home"));
const Catalog = lazy(() => import('./routes/Catalog.tsx'));
const BookSpecifications = lazy(() => import('./routes/BookSpecifications.tsx'));
const ProfileUser = lazy(() => import('./routes/ProfileUser.tsx'));
const ProfileAutor = lazy(() => import('./routes/ProfileAuthor.tsx'));
const Register = lazy(() => import('./routes/Register.tsx'));
const SearchResult = lazy(() => import('./routes/SearchResult.tsx'));
const NewBook = lazy(() => import('./routes/NewBook.tsx'));

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
  { path: "/newBook", element: <NewBook /> },
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
  <Suspense fallback={<Loader />}>
    <RouterProvider router={router} />
  </Suspense>
);