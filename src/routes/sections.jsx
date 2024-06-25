// src/routes/Router.js
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import RealTimeLocation from '../sections/blog/view/RealTimeLocation';
import EmployeeManagement from '../sections/blog/view/EmployeeManagement ';
import VehicleManagement from '../sections/blog/view/Vehicule/VehicleManagement';
import DashboardLayout from 'src/layouts/dashboard';
import UserRegistration from './components/componenetsview/UserRegistration';
import LoginView from '../sections/login/login-view';
import Register from '../routes/components/Lo/Register';
import { AuthProvider } from '../routes/components/Lo/AuthContext';
import ProtectedRoute from '../routes/components/Lo/ProtectedRoute';
import BlogView from '../sections/blog/view/blog-view';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));


export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          </Suspense>
        </AuthProvider>
      ),
      children: [
        { path: '/', element: <Navigate to="/login" replace /> }, // Redirect to login initially
        { path: 'dashboard', element: <IndexPage /> }, // Dashboard as the default page after login
        {
          path: 'user',
          element: (
            <ProtectedRoute role="admin">
              <UserPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'products',
          element: (
            <ProtectedRoute role="admin">
              <ProductsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'blog',
          element: <BlogView />,
        },
        {
          path: 'Mp',
          element: <RealTimeLocation />,
        },
        {
          path: 'employee-management',
          element: <EmployeeManagement />,
        },
        {
          path: 'vehicle-management',
          element: <VehicleManagement />,
        },
        { path: 'register', element: <UserRegistration /> },
        { path: 'loginn', element: <UserRegistration /> },
        { path: 'reg', element: <Register /> },
      ],
    },
    {
      path: 'login',
      element: <LoginView />, // Ensure this uses LoginView
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
// Main entry point
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from '../app';
// import { AuthProvider } from './components/Lo/AuthContext';

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );