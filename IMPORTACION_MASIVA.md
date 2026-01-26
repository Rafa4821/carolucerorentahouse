# Guía de Importación Masiva de Propiedades

## 📋 Descripción

El sistema incluye una funcionalidad de **importación masiva** que te permite cargar múltiples propiedades de una sola vez usando un archivo CSV, ahorrando tiempo en la carga de datos.

---

## ✨ Características

### 🎯 Importación Masiva
- ✅ Carga múltiples propiedades desde un archivo CSV
- ✅ Validación automática de datos
- ✅ Informe detallado de importación
- ✅ Las propiedades se crean sin imágenes
- ✅ Agregar imágenes manualmente después

### 🖼️ Optimización Automática de Imágenes
- ✅ **Conversión a WebP** (formato más eficiente)
- ✅ **Redimensionamiento inteligente** (máximo 1920x1080px)
- ✅ **Compresión optimizada** (85% de calidad)
- ✅ **Validación de formato y tamaño** (máximo 10MB)
- ✅ Reduce el tamaño de las imágenes en **60-80%**
- ✅ Mantiene la calidad visual

---

## 📝 Cómo Usar la Importación Masiva

### Paso 1: Descargar la Plantilla CSV

1. Ve a **Panel Admin > Gestionar Propiedades**
2. Haz clic en el botón **"Importación Masiva"**
3. En el modal, haz clic en **"Descargar Plantilla CSV"**
4. Se descargará el archivo `plantilla_propiedades.csv`

### Paso 2: Completar la Plantilla

Abre el archivo CSV con Excel, Google Sheets o cualquier editor de texto y completa los datos:

#### Columnas Obligatorias:
- **title**: Título de la propiedad
- **type**: Tipo de propiedad (CASA, DEPARTAMENTO, OFICINA, LOCAL, TERRENO, BODEGA)
- **operation**: Tipo de operación (VENTA, ARRIENDO, VENTA_ARRIENDO)
- **city**: Ciudad
- **zone**: Zona o sector
- **price**: Precio en dólares (solo números, sin símbolos)

#### Columnas Opcionales:
- **bedrooms**: Número de dormitorios
- **bathrooms**: Número de baños
- **m2**: Metros cuadrados
- **description**: Descripción detallada
- **code**: Código único (se genera automáticamente si no se proporciona)

#### Ejemplo de CSV:

```csv
title,type,operation,city,zone,price,bedrooms,bathrooms,m2,description,code
Casa en Altamira,CASA,VENTA,Caracas,Altamira,350000,4,3,250,Hermosa casa con jardín y piscina,PROP-001
Apartamento Las Mercedes,DEPARTAMENTO,VENTA,Caracas,Las Mercedes,280000,3,2,180,Moderno apartamento con vista,PROP-002
Oficina Chacao,OFICINA,ARRIENDO,Caracas,Chacao,1500,0,1,85,Oficina completamente equipada,PROP-003
```

### Paso 3: Importar el Archivo

1. Haz clic en **"Seleccionar archivo"** en el modal
2. Selecciona tu archivo CSV completo
3. Haz clic en **"Importar Propiedades"**
4. Espera a que se complete la importación
5. Revisa el informe de resultados

### Paso 4: Agregar Imágenes

Las propiedades se crean **sin imágenes**. Para agregar las imágenes:

1. Ve a la lista de propiedades
2. Haz clic en el botón **"Editar"** (ícono de lápiz)
3. En el modal de edición, haz clic en **"Seleccionar Imágenes"**
4. Selecciona las fotos de la propiedad (puedes seleccionar múltiples)
5. Las imágenes se optimizarán automáticamente
6. Haz clic en **"Actualizar"**

---

## 🎨 Optimización de Imágenes

### ¿Qué hace la optimización?

Cuando subes una imagen, el sistema automáticamente:

1. **Valida el formato**: Solo acepta JPG, PNG y WebP
2. **Valida el tamaño**: Máximo 10MB por imagen
3. **Redimensiona**: Máximo 1920x1080px manteniendo proporción
4. **Convierte a WebP**: Formato moderno más eficiente
5. **Comprime**: 85% de calidad (imperceptible a la vista)

### Beneficios:

| Antes | Después |
|-------|---------|
| JPG 5MB | WebP 800KB |
| Carga lenta | Carga rápida |
| Alto consumo | Bajo consumo |

**Resultado**: Las páginas cargan **hasta 5x más rápido** con las imágenes optimizadas.

---

## ⚠️ Consideraciones Importantes

### Formato del CSV:
- ✅ Usa **comas (,)** como separador
- ✅ Si un texto contiene comas, enciérralo entre comillas: `"Casa moderna, amplia y luminosa"`
- ✅ Codificación UTF-8 para caracteres especiales (ñ, á, é, etc.)
- ✅ No uses saltos de línea dentro de las celdas

### Tipos Válidos:
- `CASA`, `DEPARTAMENTO`, `OFICINA`, `LOCAL`, `TERRENO`, `BODEGA`

### Operaciones Válidas:
- `VENTA`, `ARRIENDO`, `VENTA_ARRIENDO`

### Precios:
- Solo números, sin símbolos de moneda
- Usa punto para decimales: `350000.50`
- Siempre en **dólares (USD)**

### Códigos:
- Si no proporcionas código, se genera automáticamente
- Si proporcionas código, asegúrate de que sea único
- Formato recomendado: `PROP-XXX`

---

## 🔧 Solución de Problemas

### Error: "Formato de archivo no válido"
- **Solución**: Asegúrate de que el archivo sea `.csv`
- Verifica que no esté dañado
- Descarga la plantilla nuevamente si es necesario

### Error: "El campo 'X' es obligatorio"
- **Solución**: Completa todos los campos obligatorios en todas las filas
- Revisa que no haya filas vacías entre los datos

### Error: "El precio debe ser un número válido"
- **Solución**: Usa solo números en el campo precio
- No uses símbolos de moneda ($, USD, etc.)
- Usa punto para decimales

### Algunas propiedades no se importaron
- Revisa el informe de errores en el modal
- Corrige los datos problemáticos
- Vuelve a importar solo las propiedades que fallaron

---

## 📊 Flujo Completo

```
1. Descargar plantilla CSV
         ↓
2. Completar datos en Excel/Sheets
         ↓
3. Guardar como CSV (UTF-8)
         ↓
4. Importar en el sistema
         ↓
5. Revisar informe de importación
         ↓
6. Editar cada propiedad
         ↓
7. Subir imágenes optimizadas
         ↓
8. ✅ Propiedades listas en el sitio
```

---

## 💡 Consejos Pro

1. **Prepara tus datos primero**: Ten toda la información lista antes de crear el CSV
2. **Usa Excel/Google Sheets**: Es más fácil que editar el CSV directamente
3. **Importa en lotes pequeños**: 10-20 propiedades a la vez para facilitar correcciones
4. **Revisa antes de importar**: Verifica los datos en la plantilla
5. **Organiza las imágenes**: Ten las fotos de cada propiedad en carpetas separadas
6. **Nombra las fotos**: Usa nombres descriptivos (ej: `casa-altamira-01-fachada.jpg`)

---

## 📸 Optimización de Imágenes: Detalles Técnicos

### Configuración Automática:
```javascript
{
  maxWidth: 1920,      // Ancho máximo
  maxHeight: 1080,     // Alto máximo
  quality: 0.85,       // 85% calidad
  format: 'webp'       // Formato WebP
}
```

### ¿Por qué WebP?
- **Tamaño**: 25-35% más pequeño que JPG
- **Calidad**: Igual o mejor que JPG
- **Compatibilidad**: Soportado por todos los navegadores modernos
- **Transparencia**: Soporta canal alpha (como PNG)

### Validaciones Automáticas:
- ✅ Formato: JPG, PNG, WebP
- ✅ Tamaño máximo: 10MB
- ✅ Redimensionamiento con proporción
- ✅ Compresión inteligente

---

## 🎯 Resumen

### Importación Masiva = Ahorro de Tiempo
- Carga 50+ propiedades en minutos
- Validación automática
- Sin imágenes inicialmente

### Optimización = Mejor Rendimiento
- Imágenes 60-80% más pequeñas
- Carga 5x más rápida
- Mejor experiencia de usuario

### Proceso Completo
1. **CSV** → Importar datos
2. **Editar** → Agregar imágenes
3. **Optimización** → Automática
4. **Listo** → Sitio rápido y eficiente

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa esta guía
2. Verifica el formato del CSV
3. Consulta el informe de errores
4. Intenta con menos propiedades

**¡La importación masiva y la optimización de imágenes hacen que gestionar tu sitio inmobiliario sea rápido y eficiente!** 🚀
