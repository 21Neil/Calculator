const buttons = document.querySelectorAll('button');
const numBtn = document.querySelectorAll('.num');
const operatorBtn = document.querySelectorAll('.operate');
const clearBtn = document.querySelector('.clear');
const backBtn = document.querySelector('.back');
const equalBtn = document.querySelector('.equal');
const view = document.querySelector('.view');
const dotBtn = document.querySelector('.dot');
let num1 = '';
let num2 = '';
let operator = '';
view.textContent = '0';

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return '👻';
  }
  return a / b;
}

function operate(operate, num1, num2) {
  switch (operate) {
    case '+':
      return add(num1, num2);
    case '−':
      return subtract(num1, num2);
    case '×':
      return multiply(num1, num2);
    case '÷':
      return divide(num1, num2);
  }
}

//----------handle button style----------
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', mouseenter);
  btn.addEventListener('mouseleave', mouseleave);
  btn.addEventListener('mousedown', mouseDown);
  btn.addEventListener('mouseup', mouseUp);
});

function mouseenter(e) {
  e.target.classList.add('enter');
}

function mouseleave(e) {
  e.target.classList.remove('enter');
  e.target.classList.remove('click');
}

function mouseDown(e) {
  e.target.classList.add('click');
}

function mouseUp(e) {
  e.target.classList.remove('click');
}
//----------handle button style----------

numBtn.forEach(btn => {
  btn.addEventListener('click', numOnclick);
});

function numOnclick(e) {
  if (num1.length > 14) return;
  if (view.textContent === '0' && e.target.value === '0') return 
  num1 += e.target.value;
  view.textContent = num1;
}

clearBtn.addEventListener('click', clear);

function clear() {
  view.textContent = '0';
  num1 = '';
  num2 = '';
}

backBtn.addEventListener('click', back);

function back() {
  if (num1 === '') {
    num2 = num2;
    num2 = num2.slice(0, num2.length - 1);
    view.textContent = num2;
  } else {
    num1 = num1;
    num1 = num1.slice(0, num1.length - 1);
    view.textContent = num1;
  }
}

operatorBtn.forEach(btn => {
  btn.addEventListener('click', operatorBtnOnclick);
});

function operatorBtnOnclick(e) {
  if (num2 === '') {
    num2 = num1;
    num1 = '';
    view.textContent = num2;
  } else if (num1 !== '' && operator !== '') {
    let answer = operate(operator, +num2, +num1).toString();
    num2 = answer;
    if (answer.length > 14) {
      answer = toE(answer);
    }
    num1 = '';
    view.textContent = answer;
  } else if (operator === '' && num1 !== '') {
    num2 = num1;
    num1 = '';
    view.textContent = num2;
  }
  operator = e.target.value;
}

equalBtn.addEventListener('click', getAnswer);

function getAnswer() {
  if (num1 === '' || num2 === '' || operator === '') return;
  let answer = operate(operator, +num2, +num1).toString();
  num2 = answer;
  if (answer.length > 14) {
    answer = toE(answer);
  }
  num1 = '';
  operator = '';
  view.textContent = answer;
}

dotBtn.addEventListener('click', dotOnclick);

function dotOnclick(e) {
  if (num1.length > 14) return;
  if (num1.includes('.')) return;
  if (view.textContent === '0' || num1 === '') {
    num1 = '0';
    num1 += e.target.value;
    view.textContent = num1;
  } else {
    num1 += e.target.value;
    view.textContent = num1;
  }
}

function toE(raw) {
  if (raw.includes('e')) {
    answer = +raw.slice(0, raw.indexOf('e'));
    long = raw.slice(raw.indexOf('+') + 1, raw.length);
  } else {
    answer = raw / Math.pow(10, raw.length - 1);
    long = raw.toString().length - 1;
  }
  answer = answer.toFixed(9);
  if (answer >= 10) {
    answer /= 10;
    long = +long;
    long += 1;
  }
  answer = `≈${answer}E${long}`;
  return answer;
}
