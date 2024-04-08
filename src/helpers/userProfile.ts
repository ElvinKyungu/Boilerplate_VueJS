export const emailValidation = (email: string, emailError: string) => {
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    emailError = 'Invalid email address'
  } else {
    emailError = ''
  }
}

export const checkCharacters = (resource: string, errorMessage: string) => {
  if (resource.length < 3 || resource.length > 15) {
    errorMessage = 'Length should be between 3 and 15 characters'
  } else {
    errorMessage = ''
  }
}
