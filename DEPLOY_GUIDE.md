# 🚀 GUÍA DE DEPLOY - CAROL LUCERO RAH

## Paso 1: Preparar Firebase

### 1.1 Firebase Console
1. Ir a [Firebase Console](https://console.firebase.google.com)
2. Seleccionar el proyecto
3. Ir a **Authentication** → Habilitar Email/Password
4. Ir a **Firestore Database** → Crear base de datos (modo producción)
5. Ir a **Storage** → Crear bucket

### 1.2 Configurar Firebase Rules

**Firestore Rules:**
```bash
# En Firebase Console → Firestore → Rules
# Copiar contenido de firestore.rules
```

**Storage Rules:**
```bash
# En Firebase Console → Storage → Rules
# Copiar contenido de storage.rules
```

### 1.3 Crear Índices Compuestos

En Firestore, crear índices para queries:

1. **properties** - Índices:
   - `type` (ASC), `createdAt` (DESC)
   - `operation` (ASC), `createdAt` (DESC)
   - `city` (ASC), `createdAt` (DESC)
   - `price` (ASC), `createdAt` (DESC)

2. **blogPosts** - Índices:
   - `published` (ASC), `createdAt` (DESC)

**Nota:** Los índices faltantes se detectarán automáticamente en el primer error de query y Firebase te dará el link para crearlos.

### 1.4 Crear Usuario Admin

```bash
# En Firebase Console → Authentication → Users → Add User
Email: admin@carolucero.cl
Password: [Crear contraseña segura]
```

---

## Paso 2: Deploy a Vercel

### 2.1 Instalar Vercel CLI (opcional)

```bash
npm install -g vercel
```

### 2.2 Deploy desde Dashboard

1. Ir a [Vercel](https://vercel.com)
2. **New Project** → Importar desde Git
3. Conectar repositorio GitHub/GitLab
4. Framework: **Vite**
5. Root Directory: `.`
6. Build Command: `npm run build`
7. Output Directory: `dist`

### 2.3 Configurar Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Importante:** Agregar variables para **Production**, **Preview** y **Development**.

### 2.4 Deploy

```bash
# Opción 1: Desde CLI
vercel --prod

# Opción 2: Desde Git
# Push a main branch → Auto deploy
git push origin main
```

---

## Paso 3: Verificar Build Local

Antes de deploy, verificar que el build funcione:

```bash
# Instalar dependencias
npm install

# Build local
npm run build

# Preview build
npm run preview

# Visitar http://localhost:4173
```

### Resolver Errores de Build

Si hay errores:

1. **Revisar console logs** en Vercel Dashboard
2. **Verificar imports** de archivos
3. **Confirmar env variables** están configuradas
4. **Limpiar cache:**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   npm run build
   ```

---

## Paso 4: Post-Deploy

### 4.1 Verificar Sitio en Producción

Visitar: `https://tu-proyecto.vercel.app`

**Checklist:**
- [ ] HomePage carga correctamente
- [ ] Navegación funciona
- [ ] Propiedades se muestran (si hay datos)
- [ ] Blog carga
- [ ] Formulario "Conoce tu M²" funciona
- [ ] Login admin accesible
- [ ] Backoffice carga correctamente

### 4.2 Lighthouse Audit

```bash
# Correr Lighthouse
npx lighthouse https://tu-proyecto.vercel.app --view

# Targets:
# Performance: > 90
# SEO: > 95
# Accessibility: > 90
# Best Practices: > 90
```

### 4.3 Google Search Console

1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Agregar propiedad con tu dominio
3. Verificar propiedad
4. Enviar sitemap: `https://tu-dominio.com/sitemap.xml`

### 4.4 Actualizar Sitemap Dinámico

Crear script para generar sitemap con propiedades y posts:

```javascript
// scripts/generate-sitemap.js
// Ejecutar después de agregar contenido
```

---

## Paso 5: Dominio Personalizado (Opcional)

### 5.1 En Vercel

1. Settings → Domains
2. Add Domain → `carolucero.cl`
3. Agregar registros DNS:

```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

### 5.2 En Proveedor DNS

Agregar registros en tu proveedor (GoDaddy, Namecheap, etc.)

### 5.3 SSL

Vercel automáticamente configura SSL con Let's Encrypt.

---

## Paso 6: Datos de Prueba

### 6.1 Crear Zonas (Conoce tu M²)

Desde Admin → Zonas, agregar:

| Zona | Valor M² |
|------|----------|
| Las Condes | 4,500,000 |
| Providencia | 4,200,000 |
| Ñuñoa | 3,800,000 |
| Santiago Centro | 3,500,000 |
| Vitacura | 5,000,000 |

### 6.2 Crear Post de Blog

Usar el ejemplo en `EXAMPLE_BLOG_POST.md` o crear desde Admin → Blog.

### 6.3 Crear Propiedades

Desde Admin → Propiedades, agregar al menos 3-5 propiedades con imágenes.

**Tip:** Usar imágenes de [Unsplash](https://unsplash.com/s/photos/house) para testing.

---

## Paso 7: Monitoreo

### 7.1 Vercel Analytics

Habilitar en Vercel Dashboard → Analytics

### 7.2 Firebase Performance

```bash
# En Firebase Console → Performance
# Ya está configurado automáticamente
```

### 7.3 Error Tracking

Revisar periódicamente:
- Vercel → Functions logs
- Firebase → Firestore logs
- Browser Console en producción

---

## Troubleshooting

### Build Falla

```bash
# Error: Module not found
→ Verificar imports en archivos
→ Case-sensitive en Linux (Vercel usa Linux)

# Error: Environment variables
→ Confirmar todas las VITE_ variables están en Vercel
→ Re-deploy después de agregar variables

# Error: Out of memory
→ Aumentar Node memory en vercel.json
```

### Firebase Connection Falla

```bash
# Error: Firebase not initialized
→ Verificar .env variables
→ Confirmar API key es correcta
→ Revisar Firebase project ID

# Error: Permission denied
→ Verificar Firebase Rules
→ Confirmar usuario tiene permisos
```

### Imágenes No Cargan

```bash
# Error: CORS
→ Configurar CORS en Firebase Storage
→ Agregar dominio de Vercel a allowed origins

# Error: 404 en imágenes
→ Verificar URLs de Firebase Storage
→ Confirmar bucket está público para lectura
```

---

## Comandos Útiles

```bash
# Deploy
vercel --prod

# Ver logs
vercel logs

# Ver dominios
vercel domains ls

# Ver variables de entorno
vercel env ls

# Build local
npm run build

# Preview
npm run preview

# Linting
npm run lint
```

---

## Mantenimiento

### Actualizaciones

```bash
# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit

# Fix automático
npm audit fix
```

### Backup

1. **Firestore**: Configurar backups automáticos en Firebase Console
2. **Storage**: Los archivos están en Firebase Storage (respaldo automático)
3. **Código**: Git repository es el backup

### Monitoreo Semanal

- [ ] Revisar Analytics de Vercel
- [ ] Revisar logs de errores
- [ ] Verificar formularios funcionan
- [ ] Backup de Firestore (automático)
- [ ] Actualizar contenido (blog, propiedades)

---

## Contacto y Soporte

**Vercel Support:** https://vercel.com/support  
**Firebase Support:** https://firebase.google.com/support  
**Documentación:** Ver README.md del proyecto

---

## ✅ Checklist Final de Deploy

- [ ] Firebase proyecto configurado
- [ ] Firebase Rules deployed
- [ ] Usuario admin creado
- [ ] Variables de entorno en Vercel
- [ ] Build local exitoso
- [ ] Deploy a Vercel exitoso
- [ ] Sitio accesible en producción
- [ ] Login funciona
- [ ] Backoffice accesible
- [ ] Formularios envían datos
- [ ] Lighthouse > 90
- [ ] Sitemap enviado a Google
- [ ] Datos de prueba agregados

**🎉 Proyecto en Producción!**
