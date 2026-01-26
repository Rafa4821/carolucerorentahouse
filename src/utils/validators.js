export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/
  return re.test(phone)
}

export const validateRut = (rut) => {
  rut = rut.replace(/\./g, '').replace(/-/g, '')
  const rutDigits = rut.slice(0, -1)
  const rutDv = rut.slice(-1).toUpperCase()
  
  let sum = 0
  let multiplier = 2
  
  for (let i = rutDigits.length - 1; i >= 0; i--) {
    sum += parseInt(rutDigits[i]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }
  
  const expectedDv = 11 - (sum % 11)
  const calculatedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString()
  
  return calculatedDv === rutDv
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== ''
}

export const validateMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength
}

export const validateMaxLength = (value, maxLength) => {
  return !value || value.toString().length <= maxLength
}

export const validateNumber = (value) => {
  return !isNaN(value) && isFinite(value)
}

export const validatePositiveNumber = (value) => {
  return validateNumber(value) && parseFloat(value) > 0
}
