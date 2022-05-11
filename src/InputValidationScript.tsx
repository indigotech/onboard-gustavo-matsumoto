export function validateEmail(email: string) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (emailRegex.test(email)) {
    console.log("valid e-mail");
    return true;
  } else {
    alert("e-mail format must be: ###@###.com");
  }
  return false;
}

export function validatePassword(password: string) {
  var passwordHaveDigitAndLetter = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  if (passwordHaveDigitAndLetter.test(password)) {
    console.log("password have at least one letter and one digit");
    return true;
  } else {
    alert("password need to have at least one letter and one digit");
  }
  if (password.length >= 7) {
    console.log("password have at least 7 characters");
  } else {
    alert("password must have at least 7 characters");
  }
  return false;
}