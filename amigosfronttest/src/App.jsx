import React from 'react';
import NotFound from './components/Notfound';
import MainLayout from './Layouts/MainLayout';
import Error from './components/Error';
import Home from './Pages/Home';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProductDetails from './components/Home/ProductDetails';
import PrivateRoutes from './Layouts/PrivateRoutes';
import Dashboard from './Pages/Dashboard';
import AdminOnly from './Pages/AdminOnly';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="produit/:id" element={<ProductDetails />}/>

      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/protected" element={<AdminOnly />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
