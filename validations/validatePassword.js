export default validatePassword = (password) => {
  return String(password).match("(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
};
