export const parseCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim())
  if (lines.length < 2) {
    throw new Error('El archivo CSV debe contener al menos una fila de encabezados y una fila de datos')
  }

  const headers = lines[0].split(',').map(h => h.trim())
  const data = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === headers.length) {
      const row = {}
      headers.forEach((header, index) => {
        row[header] = values[index].trim()
      })
      data.push(row)
    }
  }

  return data
}

const parseCSVLine = (line) => {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }

  result.push(current)
  return result
}

export const validatePropertyCSV = (data) => {
  const requiredFields = ['title', 'type', 'operation', 'city', 'zone', 'price', 'flexCode']
  const errors = []

  data.forEach((row, index) => {
    requiredFields.forEach(field => {
      if (!row[field] || row[field].trim() === '') {
        errors.push(`Fila ${index + 2}: El campo "${field}" es obligatorio`)
      }
    })

    if (row.price && isNaN(Number(row.price))) {
      errors.push(`Fila ${index + 2}: El precio debe ser un número válido`)
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

const normalizePropertyType = (type) => {
  const typeMap = {
    'casa': 'CASA',
    'apartamento': 'APARTAMENTO',
    'departamento': 'APARTAMENTO', // Mantener compatibilidad
    'oficina': 'OFICINA',
    'local comercial': 'LOCAL',
    'local': 'LOCAL',
    'terreno': 'TERRENO',
    'bodega': 'BODEGA',
    'anexo': 'ANEXO',
    'townhouse': 'TOWNHOUSE'
  }
  return typeMap[type?.toLowerCase()] || type?.toUpperCase() || 'CASA'
}

const normalizeOperationType = (operation) => {
  const operationMap = {
    'venta': 'VENTA',
    'alquiler': 'ALQUILER',
    'arriendo': 'ALQUILER'
  }
  return operationMap[operation?.toLowerCase()] || operation?.toUpperCase() || 'VENTA'
}

const capitalizeFirstLetter = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const capitalizeWords = (str) => {
  if (!str) return ''
  return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ')
}

export const convertCSVToProperties = (csvData) => {
  return csvData.map(row => ({
    title: capitalizeWords(row.title) || '',
    type: normalizePropertyType(row.type),
    operation: normalizeOperationType(row.operation),
    city: capitalizeWords(row.city) || '',
    zone: capitalizeWords(row.zone) || '',
    price: Number(row.price) || 0,
    bedrooms: row.bedrooms ? Number(row.bedrooms) : 0,
    bathrooms: row.bathrooms ? Number(row.bathrooms) : 0,
    parkingSpaces: row.parkingSpaces ? Number(row.parkingSpaces) : 0,
    m2: row.m2 ? Number(row.m2) : 0,
    yearBuilt: row.yearBuilt ? Number(row.yearBuilt) : null,
    description: row.description || '',
    observations: row.observations || '',
    code: row.code || `PROP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    flexCode: row.flexCode || '',
    images: [],
    status: 'DISPONIBLE',
    featured: false,
    createdAt: new Date().toISOString()
  }))
}

export const generateCSVTemplate = () => {
  const headers = [
    'title',
    'type',
    'operation',
    'city',
    'zone',
    'price',
    'bedrooms',
    'bathrooms',
    'parkingSpaces',
    'm2',
    'yearBuilt',
    'description',
    'observations',
    'code',
    'flexCode'
  ]

  const example = [
    'casa en altamira',
    'casa',
    'venta',
    'distrito capital',
    'altamira',
    '350000',
    '4',
    '3',
    '2',
    '250',
    '2020',
    'hermosa casa con jardín y piscina',
    'propiedad en excelente estado. requiere pequeñas reparaciones.',
    'prop-001',
    'flex-12345'
  ]

  const csv = [
    headers.join(','),
    example.join(',')
  ].join('\n')

  return csv
}

export const downloadCSVTemplate = () => {
  const csv = generateCSVTemplate()
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', 'plantilla_propiedades.csv')
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const readCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const text = e.target.result
        const data = parseCSV(text)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo CSV'))
    }

    reader.readAsText(file, 'UTF-8')
  })
}
