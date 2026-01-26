import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './features/auth/context/AuthContext'
import MainLayout from './shared/layouts/MainLayout'
import HomePage from './features/properties/pages/HomePage'
import PropertiesPage from './features/properties/pages/PropertiesPage'
import PropertyDetailPage from './features/properties/pages/PropertyDetailPage'
import BlogPage from './features/blog/pages/BlogPage'
import BlogPostPage from './features/blog/pages/BlogPostPage'
import LoginPage from './features/auth/pages/LoginPage'
import BackofficeLayout from './features/backoffice/layouts/BackofficeLayout'
import DashboardPage from './features/backoffice/pages/DashboardPage'
import ManagePropertiesPage from './features/backoffice/pages/ManagePropertiesPage'
import ManageBlogPage from './features/backoffice/pages/ManageBlogPage'
import ProtectedRoute from './features/auth/components/ProtectedRoute'
import NotFoundPage from './shared/pages/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/propiedades" element={<PropertiesPage />} />
          <Route path="/propiedades/:id" element={<PropertyDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          path="/backoffice"
          element={
            <ProtectedRoute>
              <BackofficeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="propiedades" element={<ManagePropertiesPage />} />
          <Route path="blog" element={<ManageBlogPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
