const buttons = document.querySelectorAll('button');
const numBtn = document.querySelectorAll('.num');
const operatorBtn = document.querySelectorAll('.operate');
const clearBtn = document.querySelector('.clear');
const backBtn = document.querySelector('.back');
const equalBtn = document.querySelector('.equal');
const view = document.querySelector('.view');
let num1 = '';
let operator = '';
let num2 = '';

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
  num1 += e.target.value;
  view.textContent = num1;
}

clearBtn.addEventListener('click', clear);

function clear() {
  view.textContent = '';
  num1 = '';
  num2 = '';
}

backBtn.addEventListener('click', back);

function back() {
  view.textContent = view.textContent.slice(0, view.textContent.length - 1);
  num1 = num1.slice(0, num1.length - 1);
}

operatorBtn.forEach(btn => {
  btn.addEventListener('click', operatorBtnOnclick);
});

function operatorBtnOnclick(e) {
  if (num2 === '') {
    num2 = num1;
    num1 = '';
    view.textContent = num2;
  } else {
    let answer = operate(operator, +num2, +num1);
    view.textContent = answer;
    num1 = ''
    num2 = answer
  }
  operator = e.target.value;
}

equalBtn.addEventListener('click', getAnswer);

function getAnswer() {
  let answer = operate(operator, +num2, +num1);
  view.textContent = answer;
  num1 = answer
  num2 = ''
}
