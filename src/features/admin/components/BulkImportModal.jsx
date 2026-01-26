import { useState } from 'react'
import { Modal, Button, Form, Alert, ProgressBar, ListGroup, Badge } from 'react-bootstrap'
import { FiUpload, FiDownload, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi'
import { readCSVFile, validatePropertyCSV, convertCSVToProperties, downloadCSVTemplate } from '../../../utils/csvParser'
import { propertyService } from '../../properties/services/propertyService'

function BulkImportModal({ show, onHide, onSuccess }) {
  const [file, setFile] = useState(null)
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile)
      setError(null)
      setResults(null)
    } else {
      setError('Por favor selecciona un archivo CSV válido')
      setFile(null)
    }
  }

  const handleImport = async () => {
    if (!file) {
      setError('Por favor selecciona un archivo CSV')
      return
    }

    try {
      setImporting(true)
      setError(null)
      setProgress(10)

      // Read CSV file
      const csvData = await readCSVFile(file)
      setProgress(20)

      // Validate CSV data
      const validation = validatePropertyCSV(csvData)
      if (!validation.valid) {
        setError(
          <div>
            <strong>Errores de validación:</strong>
            <ul className="mb-0 mt-2">
              {validation.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )
        setImporting(false)
        return
      }
      setProgress(30)

      // Convert CSV to property objects
      const properties = convertCSVToProperties(csvData)
      setProgress(40)

      // Import properties to Firestore
      const importResults = {
        total: properties.length,
        success: 0,
        failed: 0,
        errors: []
      }

      for (let i = 0; i < properties.length; i++) {
        try {
          await propertyService.create(properties[i])
          importResults.success++
        } catch (err) {
          importResults.failed++
          importResults.errors.push({
            row: i + 2,
            title: properties[i].title,
            error: err.message
          })
        }
        setProgress(40 + ((i + 1) / properties.length) * 60)
      }

      setResults(importResults)
      setProgress(100)

      if (importResults.failed === 0) {
        setTimeout(() => {
          onSuccess?.()
          handleClose()
        }, 2000)
      }
    } catch (err) {
      setError(err.message || 'Error al importar propiedades')
      console.error('Import error:', err)
    } finally {
      setImporting(false)
    }
  }

  const handleClose = () => {
    setFile(null)
    setResults(null)
    setError(null)
    setProgress(0)
    onHide()
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <FiUpload className="me-2" />
          Importación Masiva de Propiedades
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Alert variant="info" className="mb-4">
          <FiAlertCircle className="me-2" />
          <strong>Cómo usar la importación masiva:</strong>
          <ol className="mb-0 mt-2">
            <li>Descarga la plantilla CSV haciendo clic en el botón de abajo</li>
            <li>Completa la información de tus propiedades en el archivo</li>
            <li>Sube el archivo CSV completo</li>
            <li>Las propiedades se crearán sin imágenes</li>
            <li>Agrega las imágenes manualmente desde "Editar" de cada propiedad</li>
          </ol>
        </Alert>

        <div className="mb-4">
          <Button
            variant="outline-primary"
            onClick={downloadCSVTemplate}
            className="w-100"
          >
            <FiDownload className="me-2" />
            Descargar Plantilla CSV
          </Button>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Archivo CSV con Propiedades</Form.Label>
          <Form.Control
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={importing}
          />
          {file && (
            <Form.Text className="text-success">
              <FiCheck className="me-1" />
              Archivo seleccionado: {file.name}
            </Form.Text>
          )}
        </Form.Group>

        {error && (
          <Alert variant="danger" className="mb-3">
            <FiX className="me-2" />
            {error}
          </Alert>
        )}

        {importing && (
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span>Importando propiedades...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <ProgressBar now={progress} animated striped />
          </div>
        )}

        {results && (
          <Alert variant={results.failed === 0 ? 'success' : 'warning'} className="mb-0">
            <h6 className="mb-3">Resultado de la Importación</h6>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                Total de propiedades procesadas
                <Badge bg="primary">{results.total}</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                Importadas exitosamente
                <Badge bg="success">{results.success}</Badge>
              </ListGroup.Item>
              {results.failed > 0 && (
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  Fallidas
                  <Badge bg="danger">{results.failed}</Badge>
                </ListGroup.Item>
              )}
            </ListGroup>

            {results.errors.length > 0 && (
              <div className="mt-3">
                <strong>Errores:</strong>
                <ul className="mb-0 mt-2">
                  {results.errors.map((err, i) => (
                    <li key={i}>
                      Fila {err.row} ({err.title}): {err.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {results.failed === 0 && (
              <div className="mt-3 text-center">
                <FiCheck size={24} className="text-success me-2" />
                <strong>¡Importación completada con éxito!</strong>
                <p className="mb-0 mt-2">
                  Ahora puedes agregar imágenes a cada propiedad desde la sección de edición.
                </p>
              </div>
            )}
          </Alert>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={importing}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleImport}
          disabled={!file || importing || results?.failed === 0}
        >
          {importing ? 'Importando...' : 'Importar Propiedades'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default BulkImportModal
