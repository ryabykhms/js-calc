const calculator = new Calculator();

const countBrackets = (str) => {
  const countOpen = str !== null ? str.split("(").length - 1 : 0;
  const countClose = str !== null ? str.split(")").length - 1 : 0;
  return {
    countOpen,
    countClose,
  };
};

const inverseNumber = (str) => {
  let result = str;
  if (str.charAt(0) === "-") {
    if (/^-\d+$/.test(str) === false) {
      if (/^-\(.+\)$/.test(str) === true) {
        result = str.slice(2, str.length - 1);
      } else {
        result = "-(" + str + ")";
      }
    } else {
      result = str.slice(1);
    }
  } else if (str !== "") {
    if (/^\d+$/.test(str) === false) {
      result = "-(" + str + ")";
    } else {
      result = "-" + str + "";
    }
  }
  return result;
};

const hyperbola = (str) => {
  let result = str;
  if (str.indexOf("1/(") === 0 && str.charAt(str.length - 1) === ")") {
    result = str.substr(3, str.length - 4);
  } else {
    result = "1/(" + str + ")";
  }
  return result;
};

const buttons = document.querySelectorAll(".button");
const displayResult = document.querySelector(".display__result");
const displayInput = document.querySelector(".display__input");
let prevOperation = "";
buttons.forEach((button) => {
  button.addEventListener("click", (btn) => {
    let btnOperation = "";
    if (displayInput.value === "Error!") {
      displayInput.value = "";
    }
    const bracketsCount = countBrackets(displayInput.value);
    const operation = btn.target.getAttribute("data-operation");
    switch (operation) {
      case "pow":
        btnOperation = "^";
        break;
      case "fact":
        btnOperation = "!";
        break;
      case "inv":
        btnOperation = "";
        displayInput.value = inverseNumber(displayInput.value);
        break;
      case "clear":
        btnOperation = "";
        displayInput.value = "";
        break;
      case "bracket":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "";
        const lastChar = displayInput.value.slice(-1);
        displayInput.value =
          /\D/.test(lastChar) && lastChar !== ")"
            ? displayInput.value + "("
            : bracketsCount.countOpen > bracketsCount.countClose
            ? displayInput.value + ")"
            : bracketsCount.countOpen === bracketsCount.countClose
            ? displayInput.value + "("
            : displayInput.value;
        break;
      case "del":
        btnOperation = "";
        displayInput.value = displayInput.value.slice(0, -1);
        break;
      case "div":
        btnOperation = "/";
        break;
      case "asin":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "asin(";
        break;
      case "sin":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "sin(";
        break;
      case "hyperbola":
        btnOperation = "";
        displayInput.value = hyperbola(displayInput.value);
        break;
      case "mult":
        btnOperation = "*";
        break;
      case "acos":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "acos(";
        break;
      case "cos":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "cos(";
        break;
      case "sqrt":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "sqrt(";
        break;
      case "minus":
        btnOperation = "-";
        break;
      case "atan":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "atan(";
        break;
      case "tan":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "tan(";
        break;
      case "ln":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "ln(";
        break;
      case "plus":
        btnOperation = "+";
        break;
      case "lg":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "lg(";
        break;
      case "pi":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "PI";
        break;
      case "e":
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = "E";
        break;
      case "percent":
        btnOperation = "%";
        break;
      case "eq":
        prevOperation = "eq";
        btnOperation = "eq";
        const countMissed = bracketsCount.countOpen - bracketsCount.countClose;
        for (let i = 0; i < countMissed; i++) {
          displayInput.value += ")";
        }
        const result = calculator.calculate(displayInput.value);
        if (result === "") {
          displayInput.value = "Error!";
        } else {
          displayInput.value = result;
        }
        break;
      default:
        if (prevOperation === "eq") {
          displayInput.value = "";
        }
        btnOperation = btn.target.innerText;
        break;
    }
    prevOperation = btnOperation;
    btnOperation = btnOperation === 'eq' ? '' : btnOperation;
    displayInput.value = displayInput.value + btnOperation;
    displayResult.innerHTML = calculator.calculate(displayInput.value);
  });
});

const handleInput = (input) => {
  displayInput.value = displayInput.value.toLowerCase();
  if (displayInput.value.indexOf("error") !== -1) {
    displayInput.value = "";
  }
  const lastOperator = input.target.value.toString().slice(-1);
  const equalPosition = input.target.value.toString().indexOf("=");
  let current = input.target.value.toString();
  let result = displayResult.value;

  if (lastOperator === "=") {
    current = current.substr(0, current.length - 1);
  }
  if (equalPosition !== -1) {
    current =
      current.slice(0, equalPosition) + current.slice(equalPosition + 1);
  }
  if (
    lastOperator === "=" ||
    input.key === "Enter" ||
    input.keyCode === 13 ||
    equalPosition !== -1
  ) {
    const resultCalc = calculator.calculate(current);
    if (resultCalc !== "Error") {
      current = resultCalc;
      result = resultCalc;
    }
  } else {
    const resultCalc = calculator.calculate(result);
    if (resultCalc !== "Error") {
      result = resultCalc;
    }
  }
  displayInput.value = current;
  displayResult.innerHTML = result;
};
displayInput.onkeypress = displayInput.oninput = handleInput;
