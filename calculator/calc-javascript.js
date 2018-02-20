  

var display = "#display", // The Calculator displayed
    equals = "#equals", // Equal button
    nums = ".num", // List of numbers
    ops = ".ops", // List of operators
    newNum = "", // Current number
    oldNum = "", // First number
    resultNum, // Result
    operator; // Batman


// When: Number is clicked. Get the current number selected
function setNum() {
    if (resultNum) { // If a result was displayed, reset number
      newNum = this.getAttribute("data-num");
      resultNum = "";
    } else { // Otherwise, add digit to previous number (this is a string!)
      newNum += this.getAttribute("data-num");
    }
    display.innerHTML = newNum; // Display the current number
  };

// When: Operator(+, -, /, x, etc.) is clicked. Pass number to oldNum and save operator
function moveNum() {
    oldNum = newNum;
    newNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Reset result in display
  };

//OPERATORS
//*****************

  // When: Equals is clicked. Calculate result
function displayNum() {

    // Convert stores variables to raw numbers
    oldNum = parseFloat(oldNum);
    newNum = parseFloat(newNum);

    // Perform operation
    switch (operator) {
      case "plus":
        resultNum = oldNum + newNum;
        break;

      case "minus":
        resultNum = oldNum - newNum;
        break;

      case "times":
        resultNum = oldNum * newNum;
        break;

      case "divide":
        resultNum = oldNum / newNum;
        break;

      case "squared":
        resultNum = oldNum * oldNum;
        break;

      case "sqrRoot":
        resultNum = math.sqrt(oldNum);
        break;

      case "percentage":
        resultNum = oldNum * (newNum/100);
        break;

        // If equal is pressed without a new number
      default:
        resultNum = newNum;
    }
///////////////////

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
        resultNum = "Error";
      } else { // If result is infinity (dividing by zero)
        resultNum = "No, No, No";
        // We can add some cool function in place of the broken error message if we have some time
        // el('#calculator').classList.add("broken"); // Break calculator
        // el('#reset').classList.add("show"); // And show reset button
      }
    }

    // Code to display the result on the screen
    display.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Resetting the old saved number and keeping the result waiting for next commands
    oldNum = 0;
    newNum = resultNum;

  };

// Clear (C) command
function clearDisplay() {
  oldNum = "";
  newNum = "";
  display.innerHTML = "0";
  equals.setAttribute("data-result", resultNum);
};

// Button fuctionality 

  // Add click event to numbers
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum();
  }

  // Add click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum();
  }

  // Add click event to equal sign
  equals.onclick = displayNum();

  // Add click event to clear button
  el("#clear").onclick = clearDisplay();

  // // Add click event to reset button
  // el("#reset").onclick = function() {
  //   window.location = window.location;
  // };

