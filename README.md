# 🏠 Carol Lucero RAH - Inmobiliaria Profesional

> Sitio web inmobiliario completo y profesional construido con React, Firebase y Bootstrap. Listo para producción desde el día 1.

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7-orange.svg)](https://firebase.google.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)](https://getbootstrap.com/)

---

## ✨ Características Principales

### 🎨 **UX Premium**
- Diseño moderno con sistema de colores rojo/negro/gris/blanco
- Animaciones suaves con Framer Motion
- Responsive design (mobile-first)
- Loading states y feedback visual

### 🏢 **Backoffice Completo**
- Dashboard con KPIs en tiempo real
- CRUD completo de propiedades con upload de imágenes
- CRUD completo de blog con editor y SEO
- Gestión de zonas y valores por m²
- Autenticación segura con Firebase Auth

### 🔍 **SEO Optimizado**
- Meta tags dinámicos por página
- Open Graph y Twitter Cards
- URLs limpias y amigables
- Sitemap.xml y robots.txt
- Structured Data (Schema.org)
- Lazy loading de imágenes
- Code splitting optimizado
- Lighthouse score > 90

### 📊 **Generador de Leads**
- Herramienta "Conoce tu M²"
- Cálculo automático de valorización
- Captura de solicitudes en Firestore
- Gestión de leads desde backoffice

### 📝 **Blog Inmobiliario**
- Sistema completo de publicación
- Slugs automáticos SEO-friendly
- Imagen destacada por artículo
- Campos SEO optimizados

---

## 🚀 Tecnologías

### Frontend
- **React 18.2** - UI Library
- **Vite 5.0** - Build tool
- **React Router DOM 6** - Routing
- **Bootstrap 5.3** + React Bootstrap - UI Framework
- **Framer Motion** - Animaciones
- **React Icons** - Iconografía
- **Swiper** - Galerías de imágenes
- **React Helmet Async** - SEO meta tags

### Backend
- **Firebase 10.7**
  - Authentication - Autenticación
  - Firestore - Base de datos NoSQL
  - Storage - Almacenamiento de imágenes
  - Rules - Seguridad

### Deployment
- **Vercel** - Hosting y CI/CD
- **Git** - Control de versiones

---

## 📁 Estructura del Proyecto (Screaming Architecture)

```
src/
├── app/                    # Configuración de la app
│   └── App.jsx            # Routing principal
├── features/              # Módulos por funcionalidad
│   ├── properties/        # Propiedades
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── hooks/
│   ├── blog/             # Blog
│   ├── zones/            # Conoce tu M²
│   ├── contact/          # Contacto
│   ├── auth/             # Autenticación
│   └── admin/            # Backoffice
├── layout/               # Layout components
│   ├── components/
│   └── pages/
├── services/             # Servicios globales
├── styles/               # Estilos globales
└── utils/                # Utilidades

public/
├── robots.txt            # SEO
└── sitemap.xml          # SEO

Docs/
├── ARCHITECTURE.md       # Arquitectura detallada
├── FIREBASE_SETUP.md    # Setup de Firebase
├── DEPLOY_GUIDE.md      # Guía de deploy
├── SEO_CHECKLIST.md     # Checklist SEO
└── FINAL_CHECKLIST.md   # Validación final
```

---

## 🛠️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase
- Git

### 1. Clonar Repositorio

```bash
git clone [URL_DEL_REPO]
cd carolucero.rah
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

Ver `FIREBASE_SETUP.md` para instrucciones detalladas.

### 4. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo (puerto 3000)

# Build
npm run build           # Build para producción
npm run preview         # Preview del build local

# Linting
npm run lint            # Ejecutar ESLint

# Deploy
vercel --prod           # Deploy a Vercel (requiere CLI)
```

---

## 🚀 Deploy a Producción

### Opción 1: Vercel (Recomendado)

1. **Conectar a Vercel**
   - Ir a [vercel.com](https://vercel.com)
   - Import Git repository
   - Framework: Vite
   - Configurar variables de entorno

2. **Deploy**
   ```bash
   git push origin main
   # Auto-deploy en cada push
   ```

Ver `DEPLOY_GUIDE.md` para guía completa paso a paso.

### Opción 2: Otras Plataformas

El proyecto es compatible con:
- Netlify
- AWS Amplify
- Firebase Hosting
- Cloudflare Pages

---

## 🔐 Seguridad

### Firebase Rules

**Firestore:**
- Lectura pública para propiedades, blog publicado, zonas
- Escritura solo para usuarios autenticados (admin)

**Storage:**
- Lectura pública para todas las imágenes
- Escritura solo para usuarios autenticados
- Límite de 5MB por imagen
- Solo formatos de imagen permitidos

Ver archivos `firestore.rules` y `storage.rules`.

---

## 📊 Módulos Principales

### 1. **Properties (Propiedades)**
- Listado con filtros avanzados
- Detalle con galería de imágenes
- CRUD completo en admin
- Upload múltiple de imágenes
- Código único por propiedad

### 2. **Blog**
- Sistema de publicación completo
- SEO optimizado por artículo
- Slugs automáticos
- Imagen destacada
- Estados: publicado/borrador

### 3. **Conoce tu M² (Leads)**
- Selector de zona
- Cálculo de estimación
- Formulario de análisis
- Captura en Firestore
- Dashboard de solicitudes

### 4. **Admin/Backoffice**
- Dashboard con métricas
- Gestión de propiedades
- Gestión de blog
- Gestión de zonas
- Vista de solicitudes

---

## 🎨 Guía de Estilos

### Colores Principales

```css
--color-primary: #C41E3A;        /* Rojo principal */
--color-black: #0D0D0D;          /* Negro */
--color-white: #FFFFFF;          /* Blanco */
--color-gray-900 a gray-50       /* Escala de grises */
```

### Tipografía
- Font base: System fonts stack
- Tamaños: 14px a 48px
- Weights: 400 (regular), 600 (semibold), 700 (bold)

---

## 📈 Performance

### Métricas Lighthouse (Target)
- ✅ Performance: > 90
- ✅ SEO: > 95
- ✅ Accessibility: > 90
- ✅ Best Practices: > 90

### Optimizaciones Implementadas
- Code splitting por vendor
- Lazy loading de imágenes
- CSS code splitting
- Assets minificados
- Cache headers
- Preconnect a dominios externos

---

## 📚 Documentación Adicional

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura detallada
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Setup de Firebase
- [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md) - Guía de deploy completa
- [SEO_CHECKLIST.md](./SEO_CHECKLIST.md) - Checklist SEO
- [FINAL_CHECKLIST.md](./FINAL_CHECKLIST.md) - Validación final
- [EXAMPLE_BLOG_POST.md](./EXAMPLE_BLOG_POST.md) - Ejemplo de contenido

---

## 🤝 Mantenimiento

### Actualizaciones Recomendadas
- Semanal: Revisar analytics y logs
- Mensual: Actualizar dependencias (`npm update`)
- Trimestral: Audit de seguridad (`npm audit`)

### Backup
- Firestore: Backups automáticos en Firebase
- Storage: Respaldo automático en Firebase Storage
- Código: Git repository

---

## 📝 Roadmap Futuro (Opcional)

- [ ] Sistema de favoritos para usuarios
- [ ] Comparador de propiedades
- [ ] Chat en vivo
- [ ] Notificaciones push
- [ ] App móvil (React Native)
- [ ] Integración con CRM
- [ ] Analytics avanzado
- [ ] Tests automatizados (Jest, React Testing Library)

---

## 🐛 Troubleshooting

### Build Falla
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Firebase Connection Error
- Verificar variables de entorno
- Confirmar Firebase Rules
- Revisar console de Firebase

### Vercel Deploy Falla
- Verificar variables de entorno en Vercel
- Revisar logs en Vercel Dashboard
- Confirmar build local funciona

---

## 📄 Licencia

Proyecto privado - Todos los derechos reservados

---

## 👤 Autor

**Carol Lucero RAH**  
Inmobiliaria Profesional  
Santiago, Chile

---

## 🎉 Estado del Proyecto

**✅ PRODUCCIÓN READY**

Este proyecto está completo y listo para:
- Deploy inmediato a producción
- Uso en ambiente real
- Escalamiento según necesidad
- Mantenimiento a largo plazo

---

**Construido con ❤️ usando React + Firebase + Vite**- **Deploy**: Vercel

## 📁 Arquitectura

Screaming Architecture - estructura por features/dominios:

```
src/
├── features/
│   ├── properties/     # Módulo de propiedades
│   ├── auth/          # Autenticación
│   ├── blog/          # Blog
│   └── backoffice/    # Panel administrativo
├── shared/            # Componentes compartidos
├── core/              # Configuración y servicios
└── assets/            # Recursos estáticos
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Firebase

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build
```

## 📋 Features

- ✅ Sistema de autenticación con Firebase
- ✅ CRUD completo de propiedades
- ✅ Galería de imágenes con Swiper
- ✅ Búsqueda y filtros avanzados
- ✅ Blog administrable
- ✅ Backoffice completo
- ✅ SEO optimizado
- ✅ Responsive design
- ✅ PWA ready

## 🔐 Configuración Firebase

1. Crear proyecto en Firebase Console
2. Habilitar Authentication (Email/Password)
3. Crear Firestore Database
4. Configurar Storage
5. Copiar credenciales a `.env`

## 📦 Deploy

```bash
# Vercel
vercel --prod

# O conectar repositorio en Vercel Dashboard
```

## 👨‍💻 Equipo de Desarrollo

- Arquitecto Frontend React
- Diseñador UI/UX profesional
- Especialista en Firebase
- Experto en SEO técnico

---

**Carol Lucero RAH** - 2026 - Todos los derechos reservados
