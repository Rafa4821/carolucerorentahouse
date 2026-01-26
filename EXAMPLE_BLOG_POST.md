# POST DE EJEMPLO PARA FIRESTORE

Este archivo contiene un post de ejemplo que debe ser agregado manualmente a Firestore.

## Datos del Post

```javascript
{
  title: "Cómo Elegir la Propiedad Ideal para Invertir en 2024",
  slug: "como-elegir-propiedad-ideal-invertir-2024",
  excerpt: "Descubre los factores clave que debes considerar antes de invertir en bienes raíces. Una guía completa para tomar la mejor decisión de inversión inmobiliaria.",
  content: `La inversión en bienes raíces sigue siendo una de las formas más seguras y rentables de hacer crecer tu patrimonio. Sin embargo, elegir la propiedad correcta requiere análisis y conocimiento del mercado.

En este artículo, te guiaremos a través de los aspectos más importantes que debes evaluar antes de realizar tu inversión.

Ubicación: El Factor Más Importante

La ubicación es sin duda el elemento más crítico al momento de invertir. Una propiedad en una zona en desarrollo puede multiplicar su valor en pocos años. Busca áreas con:

- Acceso a transporte público
- Cercanía a centros comerciales y servicios
- Proyectos de infraestructura planificados
- Bajos índices de delincuencia
- Crecimiento poblacional sostenido

Evalúa el Potencial de Revalorización

No solo importa el precio actual, sino el potencial de crecimiento. Investiga:

- Planes reguladores de la zona
- Proyectos inmobiliarios en desarrollo
- Inversión pública planificada
- Tendencias del mercado local

Considera el Tipo de Propiedad

Diferentes tipos de propiedades ofrecen diferentes beneficios:

Departamentos: Menor mantención, ideal para arriendo, ubicaciones céntricas.

Casas: Mayor espacio, potencial de ampliación, más privacidad.

Locales comerciales: Rentas más altas, contratos de largo plazo, mayor riesgo.

Analiza los Números

Una inversión debe tener sentido financiero. Calcula:

- Rentabilidad esperada (al menos 4-6% anual)
- Gastos de mantención
- Contribuciones e impuestos
- Costos de administración
- Potencial de plusvalía

Estado de la Propiedad

Una propiedad en buen estado puede significar menor inversión inicial en reparaciones. Sin embargo, una propiedad a remodelar puede ofrecer mejor precio y mayor potencial de revalorización.

Conclusión

Invertir en bienes raíces requiere investigación, paciencia y asesoría profesional. En Carol Lucero RAH, contamos con expertos que pueden ayudarte a encontrar la inversión perfecta según tus objetivos y presupuesto.

¿Listo para dar el siguiente paso? Contáctanos hoy para una asesoría personalizada.`,
  coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
  seoTitle: "Guía Completa: Cómo Elegir la Propiedad Ideal para Invertir en 2024",
  seoDescription: "Aprende los factores clave para invertir exitosamente en bienes raíces: ubicación, rentabilidad, tipo de propiedad y más. Guía completa para inversionistas.",
  published: true,
  category: "Inversión",
  tags: ["inversión", "bienes raíces", "propiedades", "mercado inmobiliario"]
}
```

## Instrucciones para Agregar a Firestore

1. Ir a Firebase Console
2. Seleccionar el proyecto
3. Ir a Firestore Database
4. Crear la colección `blogPosts` si no existe
5. Agregar un nuevo documento con los datos del ejemplo
6. Asegurarse de que el campo `published` esté en `true`
7. Los campos `createdAt` y `updatedAt` se agregarán automáticamente al usar el servicio

## Para Crear Más Posts

Puedes crear más artículos siguiendo esta estructura:

- **title**: Título llamativo y SEO-friendly
- **slug**: URL-friendly (sin espacios, minúsculas, guiones)
- **excerpt**: Resumen de 1-2 líneas
- **content**: Contenido completo con párrafos separados por `\n`
- **coverImage**: URL de imagen (recomendado: Unsplash)
- **seoTitle**: Título optimizado para SEO (50-60 caracteres)
- **seoDescription**: Meta descripción (150-160 caracteres)
- **published**: `true` para visible, `false` para borrador

## Ideas de Temas Inmobiliarios

- "5 Errores Comunes al Comprar tu Primera Casa"
- "Tendencias del Mercado Inmobiliario 2024"
- "Cómo Aumentar el Valor de tu Propiedad Antes de Vender"
- "Guía Completa de Financiamiento Hipotecario"
- "Las Mejores Zonas para Invertir en Santiago"
- "Checklist: Qué Revisar Antes de Arrendar una Propiedad"
