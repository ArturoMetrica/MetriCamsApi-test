const isValidEmail = (mail) => {
  return /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(mail);
}

module.exports = isValidEmail;