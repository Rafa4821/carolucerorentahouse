# 🔥 Configuración de Firebase

## Paso 1: Crear Proyecto Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Nombre sugerido: `carolucero-inmobiliaria`
4. Desactiva Google Analytics (opcional para desarrollo)
5. Haz clic en "Crear proyecto"

## Paso 2: Configurar Authentication

1. En el menú lateral, ve a **Authentication**
2. Haz clic en "Comenzar"
3. Habilita el método **Correo electrónico/contraseña**
4. Guarda los cambios

### Crear Usuario Administrador

1. Ve a la pestaña **Users**
2. Haz clic en "Agregar usuario"
3. Email: `admin@carolucero.cl` (o el que prefieras)
4. Contraseña: Crea una contraseña segura
5. Guarda este usuario para acceder al backoffice

## Paso 3: Configurar Firestore Database

1. En el menú lateral, ve a **Firestore Database**
2. Haz clic en "Crear base de datos"
3. Selecciona **Modo de prueba** (por ahora)
4. Elige la ubicación: `us-central` o `southamerica-east1` (São Paulo)
5. Haz clic en "Habilitar"

## Paso 4: Configurar Storage

1. En el menú lateral, ve a **Storage**
2. Haz clic en "Comenzar"
3. Selecciona **Modo de prueba** (por ahora)
4. Haz clic en "Listo"

## Paso 5: Obtener Credenciales

1. Ve a **Configuración del proyecto** (⚙️ > Project Settings)
2. Desplázate hasta **Tus aplicaciones**
3. Haz clic en el ícono **</>** (Web)
4. Registra la app con nombre: `carolucero-web`
5. **NO** marques Firebase Hosting
6. Haz clic en "Registrar app"
7. Copia las credenciales que aparecen

## Paso 6: Configurar Variables de Entorno

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza los valores con tus credenciales:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=carolucero-inmobiliaria.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=carolucero-inmobiliaria
VITE_FIREBASE_STORAGE_BUCKET=carolucero-inmobiliaria.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Paso 7: Verificar Conexión

1. Reinicia el servidor de desarrollo: `npm run dev`
2. Abre http://localhost:3000
3. Desplázate al final de la página
4. Verifica que los 3 servicios muestren ✅ Conectado:
   - Authentication
   - Firestore
   - Storage

## 🔐 Reglas de Seguridad (Producción)

Antes de deployar, actualiza las reglas:

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Propiedades - lectura pública, escritura admin
    match /properties/{propertyId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Blog - lectura pública, escritura admin
    match /blog/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /properties/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /blog/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## ✅ Checklist

- [ ] Proyecto Firebase creado
- [ ] Authentication habilitado (Email/Password)
- [ ] Usuario administrador creado
- [ ] Firestore Database inicializado
- [ ] Storage configurado
- [ ] Credenciales copiadas al archivo `.env`
- [ ] Servidor reiniciado
- [ ] Conexión verificada (3 servicios ✅)

---

**¿Problemas?** Verifica:
1. Que todas las variables en `.env` estén correctas
2. Que reiniciaste el servidor después de editar `.env`
3. Que los servicios estén habilitados en Firebase Console
