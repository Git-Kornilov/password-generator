'use strict';

// const EL
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Randoms elements from CharCode
const getRandomLower = function () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // CharCode 97 = a; 26 - number of letters
};

const getRandomUpper = function () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // CharCode 97 = A
};

const getRandomNumber = function () {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // CharCode 48 = 0
};

const getRandomSymbol = function () {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Random object with functions
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Generate password string
const generatePassword = function (lower, upper, number, symbol, length) {
  let generatedPassword = '';

  const typesCount = lower + upper + number + symbol; // numbers of checked

  // destructed and filtered (true) - array
  const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  ); // {lower: true}, ... {...: true},

  if (typesCount === 0) return '';

  // loop for make random (object with functions)
  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
};

// Check value and checked => put into generate password string
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumbers = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumbers,
    hasSymbol,
    length
  );
});

// copy password to clipboard
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) return;

  textarea.value = password;

  document.body.appendChild(textarea);
  textarea.select(); // select all in textarea
  document.execCommand('copy'); // copy selected
  textarea.remove(); // remove from DOM el textarea
  alert('Password copied to clipboard!');
});
