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

export const validateZoneCSV = (data) => {
  const requiredFields = ['name', 'avgPriceM2']
  const errors = []

  data.forEach((row, index) => {
    requiredFields.forEach(field => {
      if (!row[field] || row[field].trim() === '') {
        errors.push(`Fila ${index + 2}: El campo "${field}" es obligatorio`)
      }
    })

    if (row.avgPriceM2 && isNaN(Number(row.avgPriceM2))) {
      errors.push(`Fila ${index + 2}: El valor por M² debe ser un número válido`)
    }

    if (row.avgPriceM2 && Number(row.avgPriceM2) <= 0) {
      errors.push(`Fila ${index + 2}: El valor por M² debe ser mayor a 0`)
    }
  })

  return {
    valid: errors.length === 0,
    errors
  }
}

export const convertCSVToZones = (csvData) => {
  return csvData.map(row => ({
    name: row.name || '',
    avgPriceM2: Number(row.avgPriceM2) || 0,
    description: row.description || '',
    createdAt: new Date().toISOString()
  }))
}

export const generateZoneCSVTemplate = () => {
  const headers = [
    'name',
    'avgPriceM2',
    'description'
  ]

  const examples = [
    [
      'Las Condes',
      '4500',
      'Zona premium con alta plusvalía'
    ],
    [
      'Providencia',
      '4200',
      'Sector céntrico y comercial'
    ],
    [
      'Ñuñoa',
      '3800',
      'Zona residencial con buena conectividad'
    ]
  ]

  const csv = [
    headers.join(','),
    ...examples.map(ex => ex.join(','))
  ].join('\n')

  return csv
}

export const downloadZoneCSVTemplate = () => {
  const csv = generateZoneCSVTemplate()
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', 'plantilla_zonas.csv')
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
