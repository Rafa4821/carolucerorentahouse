# 🏗️ Arquitectura del Proyecto - Screaming Architecture

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Configuración principal de la aplicación
│   └── App.jsx            # Router principal y providers
│
├── layout/                 # Componentes de layout reutilizables
│   ├── components/
│   │   ├── Header.jsx     # Navegación principal
│   │   ├── Footer.jsx     # Footer del sitio
│   │   └── LoadingSpinner.jsx
│   ├── pages/
│   │   └── NotFoundPage.jsx
│   └── MainLayout.jsx     # Layout público principal
│
├── features/               # Módulos por dominio (SCREAMING!)
│   ├── properties/        # 🏠 Gestión de propiedades
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── services/
│   │
│   ├── blog/              # 📝 Sistema de blog
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── auth/              # 🔐 Autenticación
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   │
│   ├── admin/             # ⚙️ Panel administrativo
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── components/
│   │
│   ├── contact/           # 📧 Formulario de contacto
│   │   └── pages/
│   │
│   └── zones/             # 🗺️ Zonas geográficas (futuro)
│       └── README.md
│
├── services/              # Servicios externos
│   └── firebase.js        # Configuración Firebase
│
├── utils/                 # Utilidades generales
│   ├── formatters.js      # Formateo de datos
│   ├── validators.js      # Validaciones
│   └── constants.js       # Constantes de la app
│
└── styles/                # Estilos globales
    └── global.css
```

## 🎯 Principios de Screaming Architecture

### 1. **La estructura GRITA qué es el proyecto**
   - Al ver `features/properties` entiendes inmediatamente: "Gestión de propiedades inmobiliarias"
   - No carpetas genéricas como "components" o "pages" en la raíz
   - Cada feature es autocontenido

### 2. **Organización por dominio, no por tipo**
   ❌ **MAL:**
   ```
   components/
     PropertyCard.jsx
     BlogCard.jsx
   pages/
     Properties.jsx
     Blog.jsx
   ```
   
   ✅ **BIEN:**
   ```
   features/
     properties/
       components/PropertyCard.jsx
       pages/PropertiesPage.jsx
     blog/
       components/BlogCard.jsx
       pages/BlogPage.jsx
   ```

### 3. **Cada feature es independiente**
   - Tiene sus propios componentes, páginas, servicios y hooks
   - Puede moverse o eliminarse fácilmente
   - Minimiza acoplamiento entre features

## 🚀 Rutas del Sistema

### Rutas Públicas (MainLayout)
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomePage | Página principal |
| `/propiedades` | PropertiesPage | Listado de propiedades |
| `/propiedades/:id` | PropertyDetailPage | Detalle de propiedad |
| `/blog` | BlogPage | Listado de artículos |
| `/blog/:slug` | BlogPostPage | Detalle de artículo |
| `/contacto` | ContactPage | Formulario de contacto |
| `/login` | LoginPage | Login de administrador |

### Rutas Protegidas (AdminLayout)
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/admin` | DashboardPage | Dashboard principal |
| `/admin/propiedades` | ManagePropertiesPage | CRUD propiedades |
| `/admin/blog` | ManageBlogPage | CRUD artículos |

## 🔐 Sistema de Protección de Rutas

```jsx
// Rutas protegidas requieren autenticación
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  {/* Rutas hijas protegidas */}
</Route>
```

## 📦 Módulos Implementados

### ✅ Properties (Propiedades)
- Página principal con hero section
- Listado de propiedades (en desarrollo)
- Detalle de propiedad (en desarrollo)
- CRUD admin (en desarrollo)

### ✅ Blog
- Listado de artículos (en desarrollo)
- Detalle de artículo (en desarrollo)
- CRUD admin (en desarrollo)

### ✅ Auth (Autenticación)
- Context API para estado de autenticación
- Login page
- Protected routes
- Logout funcional

### ✅ Admin (Panel Administrativo)
- Dashboard con métricas
- Navegación dedicada
- Layout separado del público

### ✅ Contact (Contacto)
- Formulario completo
- Información de contacto
- Validaciones (en desarrollo)

### 🚧 Zones (Zonas)
- Módulo planificado para filtros geográficos
- Mapas interactivos (futuro)

## 🛠️ Servicios

### Firebase (`/services/firebase.js`)
- Configuración centralizada
- Auth, Firestore, Storage
- Función de test de conexión

## 🔧 Utilidades

### Formatters (`/utils/formatters.js`)
- `formatPrice()` - Formato CLP
- `formatDate()` - Formato español
- `formatArea()` - m²
- `slugify()` - URLs amigables

### Validators (`/utils/validators.js`)
- Email, teléfono, RUT
- Validaciones de formularios
- Números positivos

### Constants (`/utils/constants.js`)
- Tipos de propiedades
- Estados de propiedades
- Regiones de Chile
- Features de propiedades

## 🎨 Layout System

### MainLayout
- Header con navegación
- Footer con info y links
- Responsive
- Para rutas públicas

### AdminLayout
- Navbar oscuro
- Navegación admin
- Sin footer
- Para rutas protegidas

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints Bootstrap 5
- Grid system en toda la app
- Componentes adaptables

## 🔄 State Management

### Context API
- `AuthContext` - Estado de autenticación global
- Mínimo acoplamiento
- Fácil de testear

### Local State
- `useState` para estado de componentes
- `useEffect` para efectos secundarios
- Hooks personalizados por feature

## 🚀 Próximos Pasos

1. **FASE 2**: Implementar CRUD completo de Properties
2. **FASE 3**: Implementar CRUD completo de Blog
3. **FASE 4**: Sistema de filtros y búsqueda
4. **FASE 5**: Módulo Zones con mapas
5. **FASE 6**: SEO optimización
6. **FASE 7**: Deploy a Vercel

---

**Última actualización**: Enero 2026
