export const PROPERTY_TYPES = {
  CASA: 'Casa',
  DEPARTAMENTO: 'Departamento',
  OFICINA: 'Oficina',
  LOCAL: 'Local Comercial',
  TERRENO: 'Terreno',
  BODEGA: 'Bodega',
  ANEXO: 'Anexo',
  TOWNHOUSE: 'Townhouse'
}

export const OPERATION_TYPES = {
  VENTA: 'Venta',
  ALQUILER: 'Alquiler'
}

export const PROPERTY_STATUS = {
  DISPONIBLE: 'Disponible',
  RESERVADA: 'Reservada',
  VENDIDA: 'Vendida',
  ARRENDADA: 'Arrendada'
}

export const REGIONS = [
  'Distrito Capital',
  'Aragua',
  'Vargas',
  'Miranda'
]

export const ZONES_BY_STATE = {
  'Distrito Capital': [
    'Alta Florida', 'Alta Vista', 'Altamira', 'Altamira Sur', 'Alto Hatillo', 'Alto Prado',
    'Altos de Carimao', 'Altos de La Trinidad', 'Antimano', 'Araguaney', 'Artigas', 'Avila',
    'Baruta', 'Bella Vista', 'Bello Campo', 'Bello Monte', 'Boleita Norte', 'Boleita Sur',
    'Bosque Valle', 'Bosques de la Lagunita', 'Buena Vista', 'Caicaguana', 'Campo Alegre',
    'Campo Claro', 'Caricuao', 'Casalta II', 'Catia', 'Caurimare', 'Cedrito', 'Cementerio',
    'Centro', 'Cerro Verde', 'Chacaito', 'Chacao', 'Chapellin', 'Charallavito', 'Chuao',
    'Chulavista', 'Coche', 'Colinas de Bello Monte', 'Colinas de Caicaguana', 'Colinas de La California',
    'Colinas de La Tahona', 'Colinas de Los Caobos', 'Colinas de Los Chaguaramos', 'Colinas de Los Ruices',
    'Colinas de Quinta Altamira', 'Colinas de Santa Monica', 'Colinas de Valle Arriba', 'Colinas de Vista Alegre',
    'Colinas de las Acacias', 'Colinas del Tamanaco', 'Corralito', 'Country Club', 'Cultura',
    'Cumbres de Curumo', 'El Avila', 'El Bosque', 'El Cafetal', 'El Cigarral', 'El Conde',
    'El Encantado', 'El Hatillo', 'El Junko', 'El Junquito', 'El Llanito', 'El Marques',
    'El Mirador', 'El Paraiso', 'El Pedregal', 'El Peñon', 'El Placer', 'El Recreo',
    'El Rosal', 'El Valle', 'Escampadero', 'Galipan', 'Gavilan', 'Guaicaipuro', 'Guaicay',
    'Guaicoco', 'Hacienda Las Marias', 'Horizonte', 'Hoyo de La Puerta', 'Industrial Las Mayas',
    'Industrial Las Nayas', 'Izcaragua', 'Juan Pablo II', 'Karimao Country', 'La Alameda',
    'La Bonita', 'La Boyera', 'La California Norte', 'La California Sur', 'La Campiña',
    'La Carlota', 'La Castellana', 'La Ciudadela', 'La Escondida', 'La Floresta', 'La Florida',
    'La Hoyada', 'La Lagunita Country Club', 'La Pastora', 'La Paz', 'La Tahona', 'La Trinidad',
    'La Union', 'La Urbina', 'La Yaguara', 'Las Acacias', 'Las Aves', 'Las Delicias de Sabana Grande',
    'Las Esmeraldas', 'Las Gonzales', 'Las Marias', 'Las Mercedes', 'Las Mesetas de Santa Rosa de Lima',
    'Las Minas', 'Las Palmas', 'Lebrun', 'Llano Verde', 'Loira', 'Loma Larga', 'Loma Linda',
    'Lomas de Bello Monte', 'Lomas de Chuao', 'Lomas de La Alameda', 'Lomas de La Lagunita',
    'Lomas de La Trinidad', 'Lomas de Las Mercedes', 'Lomas de Los Campitos', 'Lomas de Los Chorros',
    'Lomas de Monte Claro', 'Lomas de Prados del Este', 'Lomas de San Rafael de La Florida',
    'Lomas de San Roman', 'Lomas de Santa Fe', 'Lomas de Sorocaima', 'Lomas de Terrabella',
    'Lomas de Urdaneta', 'Lomas de Urquia', 'Lomas del Avila', 'Lomas del Club Hipico',
    'Lomas del Halcon', 'Lomas del Mirador', 'Lomas del Sol', 'Los Anaucos', 'Los Campitos',
    'Los Caobos', 'Los Cedros', 'Los Chaguaramos', 'Los Chorros', 'Los Cortijos de Lourdes',
    'Los Dos Caminos', 'Los Geranios', 'Los Guayabitos', 'Los Naranjos Humboldt', 'Los Naranjos de Las Mercedes',
    'Los Naranjos del Cafetal', 'Los Palos Grandes', 'Los Pomelos', 'Los Robles', 'Los Roques, Isla San Agustin',
    'Los Rosales', 'Los Ruices', 'Los Ruices Sur', 'Los Samanes', 'Macaracuay', 'Macarao',
    'Manzanares', 'Mariche', 'Mariperez', 'Mirador de Los Campitos I', 'Miranda', 'Miravila',
    'Montalban I', 'Montalban II', 'Montalban III', 'Monte Alto', 'Monte Claro', 'Monte Elena',
    'Montecristo', 'Monterrey', 'Municipio Baruta', 'Nuevo Prado', 'Oripoto', 'Palo Verde',
    'Paracotos', 'Parque Caiza', 'Parque Carabobo', 'Parque Central', 'Parque Oripoto',
    'Parroquia 23 de Enero', 'Parroquia Altagracia', 'Parroquia Catedral', 'Parroquia La Candelaria',
    'Parroquia La Vega', 'Parroquia Macarao', 'Parroquia San Agustin', 'Parroquia San Jose',
    'Parroquia San Juan', 'Parroquia San Pedro', 'Parroquia Santa Rosalia', 'Parroquia Santa Teresa',
    'Pedregal de Chapellin', 'Petare', 'Piedra Azul', 'Plaza Venezuela', 'Prado Humboldt',
    'Prado de Maria', 'Prados del Este', 'Propatria', 'Puente Hierro', 'Quebrada Honda',
    'Quinta Crespo', 'Ruiz Pineda', 'Ruperto Lugo', 'Sabana Grande', 'Sabaneta', 'San Agustin del Norte',
    'San Agustin del Sur', 'San Bernardino', 'San Jose', 'San Juan', 'San Luis', 'San Marino',
    'San Martin', 'San Rafael de La Florida', 'San Roman', 'Santa Cecilia', 'Santa Eduvigis',
    'Santa Fe Norte', 'Santa Fe Sur', 'Santa Gertrudis', 'Santa Ines', 'Santa Marta', 'Santa Monica',
    'Santa Paula', 'Santa Rosa de Lima', 'Santa Sofia', 'Sarria', 'Sebucan', 'Sector Carrizal',
    'Sector El Arroyo', 'Sector Gavilán', 'Sector Guaire Abajo', 'Simon Bolivar', 'Simon Rodriguez',
    'Solar del Hatillo', 'Solares del Carmen', 'Sorocaima', 'Terrazas De La Vega', 'Terrazas de Bella Vista',
    'Terrazas de Guaicoco', 'Terrazas de La Alameda', 'Terrazas de Santa Fe', 'Terrazas de Santa Ines',
    'Terrazas del Avila', 'Terrazas del Club Hipico', 'Turgua', 'Turumo', 'Tusmare', 'Valle Abajo',
    'Valle Alto', 'Valle Arriba', 'Villa Nueva Hatillo', 'Vista Alegre', 'Vizcaya'
  ],
  'Aragua': [
    'Cagua', 'Camatagua', 'Choroni', 'El Consejo', 'Guanayen', 'Guiripa',
    'Intercomunal Maracay-turmero', 'La Colonia Tovar', 'La Morita', 'La Victoria',
    'Magdaleno', 'Maracay', 'Mariara', 'Municipio Costa de Oro', 'Municipio Linares Alcantara',
    'Municipio San Casimiro', 'Municipio Santiago Marino', 'Municipio Urdaneta', 'Municipio del Sol',
    'Ocumare de la Costa', 'Palo Negro', 'San Francisco de Asis', 'San Mateo',
    'San Sebastian de los Reyes', 'Santa Cruz de Aragua', 'Tejerias', 'Turmero', 'Villa de Cura'
  ],
  'Vargas': [
    'Carayaca', 'Catia La Mar', 'Chuspa', 'El Junquito-Vargas', 'La Gonzalera', 'La Guaira',
    'Municipio Vargas', 'Parroquia Caraballeda', 'Parroquia Carayaca', 'Parroquia Maiquetia',
    'Parroquia Naiguata', 'Parroquia Tanaguarena'
  ],
  'Miranda': [
    'Barlovento', 'Baruta', 'Camatagua', 'Carrizal', 'Caucagua', 'Charallave',
    'Chirimena', 'Cua', 'Cupira', 'Guarenas', 'Guatire', 'Guatopo', 'Higuerote',
    'Los Teques', 'Municipio Autonomo Rafael Urdaneta', 'Municipio Brion', 'Municipio Cristobal Rojas',
    'Municipio Guaicaipuro', 'Municipio Independencia', 'Municipio Los Salias', 'Municipio Sucre',
    'Municipio Zamora', 'Ocumare del Tuy', 'Paracotos', 'Pedro Gual', 'Rio Chico',
    'San Antonio de los Altos', 'San Diego de los Altos', 'San Francisco de Yare',
    'San Jose de los Altos', 'San Pedro de los Altos', 'Santa Lucia', 'Santa Teresa',
    'Tacarigua', 'Valles del Tuy'
  ]
}

export const FEATURES = [
  'Estacionamiento',
  'Bodega',
  'Terraza',
  'Balcón',
  'Jardín',
  'Piscina',
  'Quincho',
  'Logia',
  'Walking Closet',
  'Calefacción Central',
  'Calefacción Individual',
  'Aire Acondicionado',
  'Amoblado',
  'Portería',
  'Ascensor',
  'Lavandería',
  'Gimnasio',
  'Salón de Eventos',
  'Área de Juegos',
  'Pet Friendly'
]

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
