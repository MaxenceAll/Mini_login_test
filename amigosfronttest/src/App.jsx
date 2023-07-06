import React from 'react';
import NotFound from './components/Notfound';
import MainLayout from './Layouts/MainLayout';
import Error from './components/Error';
import Home from './Pages/Home';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProductDetails from './components/Home/ProductDetails';


import UserDashboard from './Pages/UserDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import ManagerDashboard from './Pages/ManagerDashboard';
import LoggedRoutes from './Layouts/LoggedRoutes';
import AdminRoutes from './Layouts/AdminRoutes';
import ManagerRoutes from './Layouts/ManagerRoutes';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="produit/:id" element={<ProductDetails />} />

      <Route element={<LoggedRoutes />}>
        <Route path="/user" element={<UserDashboard />} />
      </Route>

      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<ManagerRoutes />}>
        <Route path="/manager" element={<ManagerDashboard />} />
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
