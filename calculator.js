let main_output = document.getElementById("main_output");
let reserve_output = document.getElementById("reserve_output");
let operation_output = document.getElementById("operation");

//maximum symbols in output
const MAX_SYMBOL_OUTPUT = 12;

let buttons_container = document.querySelector(".buttons_container");

//BugFixing
document.getElementsByClassName("delete")[0].firstElementChild.ondragstart =
  function () {
    return false;
  };

//Delegating Event for better Performance
buttons_container.onclick = function (event) {
  //if we pressed not button..
  //Bugfixing Update - Exception is Some Button Has a Img that doesnt BUbble so
  // if (event.target.tagName != "BUTTON") return;
  let tagName = event.target.tagName;
  if (tagName != "BUTTON" && tagName != "IMG") return;

  let button = event.target;
  //button type
  let className = button.classList.item(0);

  switch (className) {
    case "number":
      AddSymbolOutput(button.textContent);
      break;
    case "delete":
    case "delete_img":
      RemoveSymbolOutput();
      break;
    case "clear_all":
      clearAll();
      break;
    case "opposite":
      Opposite();
      break;
    case "dot":
      AddDot();
      break;
    case "plus":
      Operation("+");
      break;
    case "divide":
      Operation("/");
      break;
    case "percent":
      Operation("%");
      break;
    case "multiply":
      Operation("*");
      break;
    case "substract":
      Operation("-");
      break;
    case "equal":
      calculate();
      break;
  }
};

//Implementation with Keyboard
document.onkeydown = function (event) {
  let key = event.key;

  if (isFinite(+key)) {
    AddSymbolOutput(key);
    return;
  }

  switch (key) {
    case "Backspace":
      RemoveSymbolOutput();
      break;
    case "+":
      Operation("+");
      break;
    case "/":
      Operation("/");
      break;
    case "%":
      Operation("%");
      break;
    case "*":
      Operation("*");
      break;
    case "-":
      Operation("-");
      break;
    case ".":
      AddDot();
      break;
    case "=":
    case "Enter":
      calculate();
      break;
  }
};

function AddSymbolOutput(txt) {
  if (main_output.textContent.length >= MAX_SYMBOL_OUTPUT) return;
  if (main_output.textContent == "0" || main_output.textContent == "Infinity")
    main_output.textContent = "";

  main_output.textContent += txt;
}

function RemoveSymbolOutput() {
  let outputValue = main_output.textContent;

  if (outputValue.length == 0) return;

  outputValue = outputValue.slice(0, outputValue.length - 1);

  if (outputValue == "" || outputValue == "-") {
    main_output.textContent = "0";
    return;
  }

  main_output.textContent = outputValue;
}

function clearAll() {
  main_output.textContent = "0";
  reserve_output.textContent = "";
  operation_output.textContent = "";
}

function Opposite() {
  let outputValue = main_output.textContent;
  let searchRegExp = /\d\.$/g;
  if (outputValue == "0" || searchRegExp.test(outputValue)) return;
  else if (outputValue.includes("-")) {
    outputValue = outputValue.replace("-", "");
    main_output.textContent = outputValue;
    return;
  }

  main_output.textContent = "-" + outputValue;
}

function AddDot() {
  if (main_output.textContent.includes(".")) return;

  main_output.textContent += ".";
}

function Operation(op) {
  if (reserve_output.textContent.length == 0) {
    reserve_output.textContent = main_output.textContent;
    main_output.textContent = "0";
  }

  operation_output.textContent = op;
}

function calculate() {
  if (reserve_output.textContent == "") return;
  let b = +main_output.textContent;
  let a = +reserve_output.textContent;
  let op = operation_output.textContent;
  let result;

  switch (op) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "/":
      result = a / b;
      break;
    case "*":
      result = a * b;
      break;
    case "%":
      result = a % b;
      break;
  }

  if (result.toString().length > MAX_SYMBOL_OUTPUT) {
    let beforeDotSymbolCount = Math.ceil(result).toString().length;
    result = result.toFixed(MAX_SYMBOL_OUTPUT - beforeDotSymbolCount - 1);
  }

  main_output.textContent = result;
  reserve_output.textContent = "";
  operation_output.textContent = "";
}
