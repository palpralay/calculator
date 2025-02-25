document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("inputField");
    const buttons = document.querySelectorAll("pralay-button");
    let calculationString = "";
  
    const iconMap = {
      "fa-plus": "+",
      "fa-minus": "-",
      "fa-xmark": "*",
      "fa-divide": "/",
      "fa-percent": "%",
      "fa-equals": "="
    };
  
    const isOperator = (char) => ["+", "-", "*", "/", "%"].includes(char);
    
    buttons.forEach(button => {
      button.addEventListener("click", (e) => {
        const buttonElement = e.currentTarget;
        const icon = buttonElement.querySelector("i");
        let value = "";
  
        if (icon) {
          const iconClass = icon.classList[1];
          value = iconMap[iconClass] || "";
        } else {
          value = buttonElement.textContent.trim();
        }
  
        switch (value) {
          case "=":
            calculateResult();
            break;
          case "AC":
            clearAll();
            break;
          case "DEL":
            deleteLast();
            break;
          default:
            handleInput(value);
        }
  
        updateDisplay();
      });
    });
  
    function handleInput(value) {
      const lastChar = calculationString.slice(-1);
      
      if (isOperator(value)) {
        if (calculationString === "" || isOperator(lastChar)) return;
      }
  
      if (value === "%") {
        calculationString += "/100";
        return;
      }
  
      if (value === ".") {
        const currentNumber = calculationString.split(/[\+\-\*\/]/).pop();
        if (currentNumber.includes(".")) return;
      }
  
      calculationString += value;
    }
  
    function calculateResult() {
      try {
        // Convert percentages and evaluate
        let expression = calculationString.replace(/%/g, "/100");
        const result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) throw new Error("Invalid operation");
        
        calculationString = result.toString();
      } catch (error) {
        calculationString = "Error";
        setTimeout(clearAll, 1000);
      }
    }
  
    function clearAll() {
      calculationString = "";
    }
  
    function deleteLast() {
      calculationString = calculationString.slice(0, -1);
    }
  
    function updateDisplay() {
      input.value = calculationString || "0";
    }
  });