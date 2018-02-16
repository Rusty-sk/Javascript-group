  

var display = el("#display"), // The Calculator displayed
    equals = el("#equals"), // Equal button
    nums = el(".num"), // List of numbers
    ops = el(".ops"), // List of operators
    newNum = "", // Current number
    oldNum = "", // First number
    resultNum, // Result
    operator; // Batman


// When: Number is clicked. Get the current number selected
function setNum() {
    if (resultNum) { // If a result was displayed, reset number
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else { // Otherwise, add digit to previous number (this is a string!)
      theNum += this.getAttribute("data-num");
    }
    display.innerHTML = newNum; // Display the current number
  };

// When: Operator(+, -, /, x, etc.) is clicked. Pass number to oldNum and save operator
function moveNum() {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Reset result in display
  };

//OPERATORS
//*****************

  // When: Equals is clicked. Calculate result
function(displayNum) {

    // Convert stores variables to raw numbers
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Perform operation
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;

      case "times":
        resultNum = oldNum * theNum;
        break;

      case "divide":
        resultNum = oldNum / theNum;
        break;

      case "squared":
        resultNum = oldNum **;
        break;

      case "sqrRoot":
        resultNum = math.sqrt(oldNum);
        break;

      case "percentage":
        resultNum = oldNum * (theNum/100);
        break;

        // If equal is pressed without a new number
      default:
        resultNum = theNum;
    }
//////////////

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
        resultNum = "You broke it!";
      } else { // If result is infinity, set off by dividing by zero
        resultNum = "Look at what you've done";
        el('#calculator').classList.add("broken"); // Break calculator
        el('#reset').classList.add("show"); // And show reset button
      }
    }

    // Display result, finally!
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Now reset oldNum & keep result
    oldNum = 0;
    theNum = resultNum;

  };