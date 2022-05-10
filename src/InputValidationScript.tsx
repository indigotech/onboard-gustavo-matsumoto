import e from "express";
import React from "react";
import { isRegExp } from "util/types";

function validateForm(email: string, password: string)
  {    
  validateEmail(email);
  validatePassword(password);
}

function validateEmail(email: string) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (emailRegex.test(email)) {
    console.log("valid e-mail");
  } else {
    alert("e-mail format must be: ###@###.com");
  }
}

function validatePassword(password: string) {
  var passwordHaveDigitAndLetter = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
  if (passwordHaveDigitAndLetter.test(password)) {
    console.log("password have at least one letter and one digit");
  } else {
    alert("password need to have at least one letter and one digit");
  }
  if (password.length >= 7) {
    console.log("password have at least 7 characters");
  } else {
    alert("password must have at least 7 characters");
  }
}

export default validateForm;
