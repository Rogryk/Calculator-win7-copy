//******** Select DOM Elements **************
//**** buttons ****
// numerical , and 0-9
let temp_btns = Array.from(document.querySelectorAll(".btn-num"));
const num_btns = [
  document.getElementById(","),
  ...temp_btns.slice(6, 9),
  ...temp_btns.slice(3, 6),
  ...temp_btns.slice(0, 3),
];
temp_btns = [];
// operational 0-neg, 1-sqrt, 2-div, 3-percent, 4-mult, 5-1/x, 6-sub, 7-equal, 8-add
const op_btns = document.querySelectorAll(".btn-oper");
// cleaning 0-bckspc, 1-C, 2-CE
const cln_btns = document.querySelectorAll(".btn-clr");
// memory btns 0-MC, 1-MR, 2-MS, 3-M+, 4-M-
const mmr_btns = document.querySelectorAll(".btn-memory");

//**** display ****
// control arrows 0-up, 1-down
const hist_btns = document.querySelectorAll(".btn-arrow");
// history panel
const hist_section = document.querySelector(".display-history");
// upper input display (current equation)
const equation_span = document.querySelector(".display-input-higher");
// lower input display (current number)
const number_span = document.querySelector(".display-input-lower");

const keyboard_div = document.querySelector(".calc-keyboard");
keyboard_div.addEventListener("click", (e) => keyboardHandler(e));

//**** variables ****
let inputNumber = "0"; //currenttly inputed number (lower half of input display)
let inputEquation = []; //currently inputed equation (higher half of input display)
let inputSign = ""; //current sign
let result = null; //result from last calculation
let equationHistory = [];

//**** functions ****
const keyboardHandler = (e) => {
  // click on numbers
  if (e.target.dataset.action === "numerical") {
    inputNumber += e.target.innerHTML;
  } else if (e.target.dataset.action === "operation") {
    // make exception for +- btn
    // make exception for equity btn
    // make exception for sqrt
    inputNumber = inputNumber || result || "";
    if (inputNumber || e.target.id === "equal-sign") {
      switch (e.target.id) {
        case "add":
          console.log("add");
          inputEquation.push(inputSign);
          inputEquation.push(Number(inputNumber));
          inputSign = "+";
          inputNumber = "";
          break;
        case "sub":
          console.log("sub");
          inputEquation.push(inputSign);
          inputEquation.push(Number(inputNumber));
          inputSign = "-";
          inputNumber = "";
          break;
        case "mult":
          console.log("mult");
          inputEquation.push(inputSign);
          inputEquation.push(Number(inputNumber));
          inputSign = "*";
          inputNumber = "";
          break;
        case "div":
          console.log("div");
          inputEquation.push(inputSign);
          inputEquation.push(Number(inputNumber));
          inputSign = "/";
          inputNumber = "";
          break;
        case "equal-sign":
          //   console.log("equal");
          inputEquation.push(inputSign);
          inputEquation.push(Number(inputNumber));
          result = calculation(inputEquation);
          inputNumber = "";
          equationHistory.push(inputEquation);
          inputEquation = [];
          inputSign = "";
          historyDisplayHandler();
          break;
      }
    } else {
      inputSign = e.target.innerHTML;
    }
  }

  console.log(inputNumber);
  console.log(inputEquation);
  inputDisplayHandler();
};

const inputDisplayHandler = () => {
  // lower
  if (inputNumber) {
    number_span.innerHTML = Number(inputNumber);
  } else if (result) {
    number_span.innerHTML = Number(result);
  } else if (inputEquation[inputEquation.length - 1]) {
    number_span.innerHTML = inputEquation[inputEquation.length - 1];
  } else {
    number_span.innerHTML = "";
  }
  // higher
  equation_span.innerHTML = inputEquation.join("") + inputSign;
};

const historyDisplayHandler = () => {
  hist_section.innerHTML = "";
  equationHistory.map((equation, index) => {
    hist_section.innerHTML += `<p id="eq${index}">${equation.join("")}</p>`;
  });
  //   hist_section.innerHTML = equationHistory.join("");

  console.log(inputEquation);
  console.log(equationHistory);
};

const calculation = (mathEquation) => {
  // no math sequence
  console.log(mathEquation);
  if (mathEquation.length === 2) {
    return mathEquation[1];
  }
  const firstNum = mathEquation[1];
  const secondNum = mathEquation[3];
  const sign = mathEquation[2];

  switch (sign) {
    case "+":
      return calculation(["", firstNum + secondNum, ...mathEquation.slice(4)]);
    case "-":
      return calculation(["", firstNum - secondNum, ...mathEquation.slice(4)]);
    case "*":
      return calculation(["", firstNum * secondNum, ...mathEquation.slice(4)]);
    case "/":
      return calculation(["", firstNum / secondNum, ...mathEquation.slice(4)]);
  }
};

const initialize = () => {
  inputDisplayHandler();
};

initialize();
