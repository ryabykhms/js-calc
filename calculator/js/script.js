const calculator = new Calculator();

const buttons = document.querySelectorAll(".button");
const displayResult = document.querySelector(".display__result");
const displayInput = document.querySelector(".display__input");
buttons.forEach((button) => {
  button.addEventListener("click", (btn) => {
    let btnOperation = "";
    if (displayInput.value === "Error!") {
      displayInput.value = "";
    }
    if (btn.target.hasAttribute("data-operation")) {
      const operation = btn.target.getAttribute("data-operation");
      switch (operation) {
        case "pow":
          btnOperation = "^";
          break;
        case "fact":
          btnOperation = "!";
          break;
        case "inv":
          btnOperation = "-";
          break;
        case "clear":
          btnOperation = "";
          displayInput.value = "";
          break;
        case "bracket":
          btnOperation = "(";
          break;
        case "del":
          btnOperation = "";
          displayInput.value = displayInput.value.slice(0, -1);
          break;
        case "div":
          btnOperation = "/";
          break;
        case "asin":
          btnOperation = "asin";
          break;
        case "sin":
          btnOperation = "sin";
          break;
        case "hyperbola":
          btnOperation = "1/x";
          break;
        case "mult":
          btnOperation = "*";
          break;
        case "acos":
          btnOperation = "acos";
          break;
        case "cos":
          btnOperation = "cos";
          break;
        case "sqrt":
          btnOperation = "sqrt";
          break;
        case "minus":
          btnOperation = "-";
          break;
        case "atan":
          btnOperation = "atan";
          break;
        case "tan":
          btnOperation = "tan";
          break;
        case "ln":
          btnOperation = "ln";
          break;
        case "plus":
          btnOperation = "+";
          break;
        case "lg":
          btnOperation = "lg";
          break;
        case "pi":
          btnOperation = "PI";
          break;
        case "e":
          btnOperation = "E";
          break;
        case "percent":
          btnOperation = "%";
          break;
        case "eq":
          btnOperation = "";
          const result = calculator.calculate(displayInput.value);
          if (result === "") {
            displayInput.value = "Error!";
          } else {
            displayInput.value = result;
          }

          break;
      }
    } else {
      btnOperation = btn.target.innerText;
    }
    displayInput.value = displayInput.value + btnOperation;
    displayResult.innerHTML = calculator.calculate(displayInput.value);
  });
});
