import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../features/auth/context/AuthContext'
import MainLayout from '../layout/MainLayout'
import HomePage from '../features/properties/pages/HomePage'
import PropertiesPage from '../features/properties/pages/PropertiesPage'
import PropertyDetailPage from '../features/properties/pages/PropertyDetailPage'
import BlogPage from '../features/blog/pages/BlogPage'
import BlogPostPage from '../features/blog/pages/BlogPostPage'
import ContactPage from '../features/contact/pages/ContactPage'
import KnowYourM2Page from '../features/zones/pages/KnowYourM2Page'
import LoginPage from '../features/auth/pages/LoginPage'
import AdminLayout from '../features/admin/layouts/AdminLayout'
import DashboardPage from '../features/admin/pages/DashboardPage'
import ManagePropertiesPage from '../features/admin/pages/ManagePropertiesPage'
import ManageBlogPage from '../features/admin/pages/ManageBlogPage'
import ManageZonesPage from '../features/admin/pages/ManageZonesPage'
import ManageRequestsPage from '../features/admin/pages/ManageRequestsPage'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'
import NotFoundPage from '../layout/pages/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/propiedades" element={<PropertiesPage />} />
          <Route path="/propiedades/:id" element={<PropertyDetailPage />} />
          <Route path="/conoce-tu-m2" element={<KnowYourM2Page />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="propiedades" element={<ManagePropertiesPage />} />
          <Route path="blog" element={<ManageBlogPage />} />
          <Route path="zonas" element={<ManageZonesPage />} />
          <Route path="solicitudes" element={<ManageRequestsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
