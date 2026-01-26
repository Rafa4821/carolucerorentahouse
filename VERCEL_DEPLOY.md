# 🚀 Guía de Deployment en Vercel

## 📋 Pasos para Deployar

### 1️⃣ Configurar Variables de Entorno en Vercel

Antes de hacer el deploy, debes agregar las variables de entorno de Firebase en Vercel:

#### **Opción A: Desde el Dashboard de Vercel (Recomendado)**

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `carolucerorentahouse`
3. Ve a **Settings** (Configuración)
4. En el menú lateral, haz clic en **Environment Variables**
5. Agrega las siguientes variables **una por una**:

| Variable | Valor (desde tu .env) | Environment |
|----------|----------------------|-------------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyCt0e9tUxSwQWKtXkvGIG3DniVwPmEnL6E` | Production, Preview, Development |
| `VITE_FIREBASE_AUTH_DOMAIN` | `carolucero-rah.firebaseapp.com` | Production, Preview, Development |
| `VITE_FIREBASE_PROJECT_ID` | `carolucero-rah` | Production, Preview, Development |
| `VITE_FIREBASE_STORAGE_BUCKET` | `carolucero-rah.firebasestorage.app` | Production, Preview, Development |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `670832096878` | Production, Preview, Development |
| `VITE_FIREBASE_APP_ID` | `1:670832096878:web:5940a2fe2fef3f1f10987f` | Production, Preview, Development |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-1TT0B1X5F3` | Production, Preview, Development |

**Importante:** Marca **todos los ambientes** (Production, Preview, Development) para cada variable.

6. Haz clic en **Save** después de agregar cada variable

#### **Opción B: Desde Vercel CLI**

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Login
vercel login

# Agregar variables de entorno
vercel env add VITE_FIREBASE_API_KEY
# Pega el valor: AIzaSyCt0e9tUxSwQWKtXkvGIG3DniVwPmEnL6E
# Selecciona: Production, Preview, Development

# Repite para cada variable...
```

---

### 2️⃣ Hacer Deploy

Una vez configuradas las variables:

#### **Desde GitHub (Automático)**

Si tu proyecto está conectado a GitHub:

1. Haz `git push` de los cambios
2. Vercel detectará el push automáticamente
3. Hará el build y deploy

#### **Desde Vercel CLI (Manual)**

```bash
# En la raíz del proyecto
vercel --prod
```

---

### 3️⃣ Verificar el Deploy

1. Ve a tu proyecto en Vercel Dashboard
2. Verás el deploy en progreso
3. Una vez completado, haz clic en **Visit** para ver tu sitio

---

## 🔍 Solución de Problemas

### ❌ Error: "Environment Variable references Secret"

**Causa:** El `vercel.json` tenía referencias a secrets que no existen.

**Solución:** Ya corregido. El `vercel.json` ahora no tiene configuración de env. Las variables se agregan manualmente en el dashboard.

---

### ❌ Error: Build Failed

**Posibles causas:**

1. **Variables de entorno no configuradas**
   - Verifica que todas las variables estén en Vercel Dashboard
   - Asegúrate de seleccionar todos los ambientes

2. **Error de build en el código**
   - Revisa los logs de build en Vercel
   - Ejecuta `npm run build` localmente para verificar

---

### ❌ Sitio en blanco después del deploy

**Posibles causas:**

1. **Firebase no inicializado**
   - Verifica las variables de entorno en Vercel
   - Revisa la consola del navegador (F12) para errores

2. **Rutas no funcionan (404 en refresh)**
   - Ya está configurado en `vercel.json` con rewrites
   - Todas las rutas redirigen a `index.html`

---

## ✅ Checklist Pre-Deploy

- [ ] Variables de entorno agregadas en Vercel Dashboard
- [ ] Código pusheado a GitHub (`git push`)
- [ ] Build local exitoso (`npm run build`)
- [ ] Firebase configurado correctamente
- [ ] Firestore Rules deployed (`firebase deploy --only firestore:rules`)
- [ ] Storage Rules deployed (`firebase deploy --only storage`)

---

## 🎯 Estructura del Deploy

```
GitHub Push
     ↓
Vercel detecta cambios
     ↓
Lee vercel.json (configuración)
     ↓
Carga variables de entorno
     ↓
Ejecuta: npm run build
     ↓
Genera: dist/
     ↓
Deploy a CDN de Vercel
     ↓
✅ Sitio en vivo
```

---

## 🔐 Seguridad

### Variables de Entorno en Vercel

✅ **Seguro:** Las variables de entorno en Vercel están encriptadas
✅ **No expuestas:** No aparecen en el código del cliente
✅ **Protegidas:** Solo accesibles durante el build

### Firebase API Key

⚠️ **Nota:** La `VITE_FIREBASE_API_KEY` es pública por diseño de Firebase. La seguridad está en:
- Firestore Rules
- Storage Rules  
- Firebase Authentication

---

## 📊 Configuración Actual

### Framework: Vite
- Build: `npm run build`
- Output: `dist/`

### Región: South America
- `gru1` (São Paulo, Brasil)

### Headers Configurados:
- Cache estático: 1 año
- Security headers: X-Content-Type-Options, X-Frame-Options, etc.

### Rewrites:
- Todas las rutas → `/index.html` (SPA routing)

---

## 🚀 Comandos Útiles

```bash
# Ver logs del deployment
vercel logs

# Redeploy
vercel --prod

# Ver deployments
vercel ls

# Ver variables de entorno
vercel env ls

# Eliminar deployment
vercel rm [deployment-url]
```

---

## 📱 URLs

Después del deploy tendrás:

- **Production:** `https://tu-proyecto.vercel.app`
- **Preview:** `https://tu-proyecto-git-branch.vercel.app`
- **Custom Domain:** Configurable en Vercel Dashboard

---

## ✨ Mejoras Futuras

- [ ] Configurar dominio personalizado (`carolinalucero.com`)
- [ ] Configurar Analytics de Vercel
- [ ] Agregar webhook para notificaciones de deploy
- [ ] Configurar staging environment

---

**¡Tu sitio estará en vivo una vez completes estos pasos!** 🎉
