export const validatePassword = (password: string) => ({
  length: password.length >= 8,
  letter: /[A-Za-z]/.test(password),
  number: /\d/.test(password),
  special: /[#$@!%*?&]/.test(password),
});
