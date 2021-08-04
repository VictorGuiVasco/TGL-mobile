function emailValidation(field: string) {
  const user = field.substring(0, field.indexOf('@'))
  const domain = field.substring(field.indexOf('@') + 1, field.length)

  if (
    user.length >= 1 &&
    domain.length >= 3 &&
    user.search('@') == -1 &&
    domain.search('@') == -1 &&
    user.search(' ') == -1 &&
    domain.search(' ') == -1 &&
    domain.search('.') != -1 &&
    domain.indexOf('.') >= 1 &&
    domain.lastIndexOf('.') < domain.length - 1
  ) {
    return true
  } else {
    return false
  }
}

export { emailValidation }
