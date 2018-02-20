// TO DO
// prevent input when special function buttons are pressed alone
// Fix error for newNum decimal equals by itself
// limit decimal to one unit


// function to retrieve elements
var el = function(element) {
    if (element.charAt(0) === "#") { // If passed an ID...
      return document.querySelector(element); // ... returns single element
    }
    return document.querySelectorAll(element); // Otherwise, returns a nodelist
  };

var display = el("#display"), // The Calculator displayed
    memDisplay = el("#memDisplay"), // The display for stored number
    equals = el("#equals"), // Equal button
    squared = el("#squared"), // Squared button
    sqrRoot = el("#sqrRoot"), // Square Root button
    percent = el("#percent"), // Square Root button
    nums = el(".num"), // List of numbers
    ops = el(".ops"), // List of operators
    newNum = "", // Current number
    oldNum = "", // First number
    maxNumLength = 11,
    resultNum, // Result
    operator; // + - / * etc.

// When: Number is clicked. Get the current number selected
var setNum = function() {
    if (resultNum) { // If a result was displayed, reset number
      newNum = this.getAttribute("data-num");
      resultNum = "";
    } else {
        if (newNum.length > maxNumLength) {
        newNum = "DANGER OVERLOAD x(";
        } else { // Otherwise, add digit to previous number (this is a string!)
            newNum += this.getAttribute("data-num");
    }

    display.innerHTML = newNum; // Display the current number
    memDisplay.innerHTML = oldNum; // Display the number stored in memory
  };
};

// When: Operator(+, -, /, x, etc.) is clicked. Pass number to oldNum and save operator
var moveNum = function() {
    oldNum = newNum;
    newNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Reset result in display
  };

//OPERATORS
//*****************

  // Calculate result for simple functions when Equals is clicked.
  var displayNum = function() {

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
    memDisplay.innerHTML = 0;
    equals.setAttribute("data-result", resultNum);

    // Resetting the old saved number and keeping the result waiting for next commands
    oldNum = 0;
    newNum = resultNum;

  };

var displayRoot = function() {

  oldNum = parseFloat(oldNum);
  newNum = parseFloat(newNum);

  if(isNaN(newNum)){
      display.innerHTML = 0;
      memDisplay.innerHTML = 0;
      oldNum = "";
      newNum = "";
      return;
  } else {
      resultNum = newNum * newNum;

      display.innerHTML = resultNum;
      memDisplay.innerHTML = "x²";
      equals.setAttribute("data-result", resultNum);

      oldNum = 0;
      newNum = resultNum;
      }
}

var displaySqr = function() {

oldNum = parseFloat(oldNum);
newNum = parseFloat(newNum);

  if(isNaN(newNum)){
      display.innerHTML = 0;
      memDisplay.innerHTML = 0;
      oldNum = "";
      newNum = "";
      return;
  } else {
      resultNum = Math.sqrt(newNum);

      display.innerHTML = resultNum;
      memDisplay.innerHTML = "√";
      equals.setAttribute("data-result", resultNum);

      oldNum = 0;
      newNum = resultNum;
      }
}

var displayPercent = function() {

oldNum = parseFloat(oldNum);
newNum = parseFloat(newNum);

  if(isNaN(newNum)){
      display.innerHTML = 0;
      memDisplay.innerHTML = 0;
      oldNum = "";
      newNum = "";
      return;
  } else {
      resultNum = newNum / 100;

      display.innerHTML = resultNum;
      equals.setAttribute("data-result", resultNum);

      newNum = resultNum;
      }
}

// Clear (C) command
var clearDisplay = function() {
  oldNum = "";
  newNum = "";
  display.innerHTML = "0";
  memDisplay.innerHTML = "0";
  equals.setAttribute("data-result", resultNum);
};

// Button fuctionality

  // Add click event to numbers
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // Add click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Add click event to equal sign
  equals.onclick = displayNum;

  squared.onclick = displayRoot;

  sqrRoot.onclick = displaySqr;

  percent.onclick = displayPercent;

  // Add click event to clear button
  el("#clear").onclick = clearDisplay;

  // // Add click event to reset button
  // el("#reset").onclick = function() {
  //   window.location = window.location;
  // };
