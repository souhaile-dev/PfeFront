// src/routes/Router.js
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import RealTimeLocation from '../sections/blog/view/RealTimeLocation';
import EmployeeManagement from '../sections/blog/view/EmployeeManagement ';
import VehicleManagement from '../sections/blog/view/Vehicule/VehicleManagement';
import Maintenance from '../sections/blog/view/maintenance/Maintenance';
import DashboardLayout from 'src/layouts/dashboard';
import UserRegistration from './components/componenetsview/UserRegistration';
import LoginView from '../sections/login/login-view';
import Register from '../routes/components/Lo/Register';
import { AuthProvider } from '../routes/components/Lo/AuthContext';
import ProtectedRoute from '../routes/components/Lo/ProtectedRoute';
import BlogView from '../sections/blog/view/blog-view';
import AppView from 'src/pages/app';
import StockForm from '../sections/blog/view/Stock/StockForm';

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
        { path: '/', element: <Navigate to="/login" replace /> },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoute roles={['ADMIN']}>
              <IndexPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'user',
          element: (
            <ProtectedRoute roles={['ADMIN']}>
              <UserPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'products',
          element: (
            <ProtectedRoute roles={['ADMIN']}>
              <ProductsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'blog',
          element: (
            <ProtectedRoute roles={['ADMIN', 'DRIVER']}>
              <BlogView />
            </ProtectedRoute>
          ),
        },
        {
          path: 'mp',
          element: (
            <ProtectedRoute roles={['ADMIN', 'DRIVER']}>
              <RealTimeLocation />
            </ProtectedRoute>
          ),
        },
        {
          path: 'employee-management',
          element: (
            <ProtectedRoute roles={['ADMIN', 'EMPLOYEE']}>
              <EmployeeManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: 'vehicle-management',
          element: (
            <ProtectedRoute roles={['ADMIN', 'DRIVER']}>
              <VehicleManagement />
            </ProtectedRoute>
          ),
        },
        {
          path: 'maintenance',
          element: (
            <ProtectedRoute roles={['ADMIN', 'DRIVER']}>
              <Maintenance />
            </ProtectedRoute>
          ),
        },
        {
          path: 'stock',
          element: (
            <ProtectedRoute roles={['ADMIN']}>
              <StockForm />
            </ProtectedRoute>
          ),
        },
        { path: 'register', element: <UserRegistration /> },
        { path: 'login', element: <LoginView /> },
        { path: 'reg', element: <Register /> },
      ],
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

