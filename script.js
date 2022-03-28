const buttons = document.querySelectorAll('button')
const numAndOperate = document.querySelectorAll('.num, .operate')
const clearBtn = document.querySelector('.clear')
const backBtn = document.querySelector('.back')
const equalBtn = document.querySelector('.equal')
const view = document.querySelector('.view')
let content = '';

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
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return divide(num1, num2);
  }
}

//----------handle button style----------
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', mouseenter)
  btn.addEventListener('mouseleave', mouseleave)
  btn.addEventListener('mousedown', mouseDown)
  btn.addEventListener('mouseup', mouseUp)
})

function mouseenter(e) {
  e.target.classList.add('enter')
}

function mouseleave(e) {
  e.target.classList.remove('enter')
  e.target.classList.remove('click')
}

function mouseDown(e) {
  e.target.classList.add('click')
}

function mouseUp(e) {
  e.target.classList.remove('click')
}
//----------handle button style----------

numAndOperate.forEach(btn => {
  btn.addEventListener('click', numAndOperateOnclick)
})

function numAndOperateOnclick(e) {
  if(content.length > 14) return
  view.textContent += e.target.value
  content += e.target.value;
}

clearBtn.addEventListener('click', clear)

function clear() {
  view.textContent = ''
  content = '';
}

backBtn.addEventListener('click', back);

function back() {
  view.textContent = view.textContent.slice(0, view.textContent.length - 1)
  content = content.slice(0, content.length - 1);
  console.log(content)
}
