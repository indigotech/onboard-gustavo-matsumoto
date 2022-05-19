export function validateEmail(email: string) {
  const emailVal = { bol: true, message: "" };
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    emailVal.bol = false;
    emailVal.message = "e-mail format must be: ###@###.com";
  }
  return emailVal;
}

export function validatePassword(password: string) {
  const passwordVal = { bol: true, message: "" };
  const passwordHaveDigitAndLetter =
    /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

  if (!passwordHaveDigitAndLetter.test(password) || password.length < 7) {
    passwordVal.bol = false;
    passwordVal.message =
      "password must have at least 7 characters including one letter and one digit 1";
  }
  return passwordVal; 
}
