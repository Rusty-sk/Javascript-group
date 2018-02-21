// TO DO
// character Limit for calculations(display/string length)
// hide placeholder dots for funk display


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
    plus = el("#plus"), // Plus Button
    decimal = el("#decimal"), // Decimal Button
    nums = el(".num"), // List of numbers
    ops = el(".ops"), // List of operators
    newNum = "", // Current number
    oldNum = "", // First number
    maxNumLength = 9,
    resultNum, // Result
    operator; // + - / * etc.

// When: Number is clicked. Get the current number selected
var setNum = function() {
  if (newNum.length > maxNumLength) {
      newNum = "DANGER OVERLOAD x(";
    } else {
      if (resultNum) { // If a result was displayed, reset number
        newNum = this.getAttribute("data-num");
        resultNum = "";
        } else { // if within bounds will add digits to previous number
            newNum += this.getAttribute("data-num");
    }

    display.innerHTML = newNum; // Display the current number
    memDisplay.innerHTML = oldNum; // Display the number in memory area
  };
};

// When: Operator(+, -, /, x, etc.) is clicked. Pass number to oldNum and save operator
var moveNum = function() {
    oldNum = newNum;
    newNum = "";
    operator = this.getAttribute("data-ops")
    funkDisplay.innerHTML = this.getAttribute("id");
    equals.setAttribute("data-result", ""); // Reset result in display
  };

var disableDecimal = function(){
    newNum += this.getAttribute("data-num");
    decimal.disabled=true;
  };

//OPERATORS
//*****************

  // Equals button calculations
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

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
        resultNum = "Error";
      } else { // If result is infinity (dividing by zero)
        resultNum = "No, No, No!!! 0w0";
      }
    }

    // Code to display the result on the screen
    display.innerHTML = resultNum;
    memDisplay.innerHTML = "";
    funkDisplay.innerHTML = ".";
    equals.setAttribute("data-result", resultNum);
    decimal.disabled=false;

    // Resetting the old saved number and keeping the result waiting for next commands
    oldNum = 0;
    newNum = resultNum;
  };

//** Special function button calculations

var displayRoot = function() {

  oldNum = parseFloat(oldNum);
  newNum = parseFloat(newNum);

  if(isNaN(newNum)){
      display.innerHTML = 0;
      memDisplay.innerHTML = "";
      oldNum = "";
      newNum = "";
      return;
  } else {
      resultNum = newNum * newNum;

      display.innerHTML = resultNum;
      funkDisplay.innerHTML = "x²";
      equals.setAttribute("data-result", resultNum);
      decimal.disabled=false;

      oldNum = 0;
      newNum = resultNum;
      }
}

var displaySqr = function() {

oldNum = parseFloat(oldNum);
newNum = parseFloat(newNum);

  if(isNaN(newNum)){
      display.innerHTML = 0;
      memDisplay.innerHTML = "";
      oldNum = "";
      newNum = "";
      return;
  } else {
      resultNum = Math.sqrt(newNum);

      display.innerHTML = resultNum;
      funkDisplay.innerHTML = "√";
      equals.setAttribute("data-result", resultNum);
      decimal.disabled=false;

      oldNum = 0;
      newNum = resultNum;
      }
}

var displayPercent = function() {

oldNum = parseFloat(oldNum);
newNum = parseFloat(newNum);

  if(isNaN(newNum)){
      display.innerHTML = 0;
      memDisplay.innerHTML = "";
      funkDisplay.innerHTML = ".";
      oldNum = "";
      newNum = "";
      return;
  } else {
      resultNum = newNum / 100;

      display.innerHTML = resultNum;
      funkDisplay.innerHTML = "%";
      equals.setAttribute("data-result", resultNum);
      decimal.disabled=false;

      newNum = resultNum;
      }
}

// Clear button function
var clearDisplay = function() {
  oldNum = "";
  newNum = "";
  resultNum = "";
  display.innerHTML = "0";
  memDisplay.innerHTML = "";
  funkDisplay.innerHTML = ".";
  decimal.disabled=false;
};

// Button fuctionality and click events

  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  decimal.onclick = disableDecimal;

  equals.onclick = displayNum;

  squared.onclick = displayRoot;

  sqrRoot.onclick = displaySqr;

  percent.onclick = displayPercent;

  el("#clear").onclick = clearDisplay;
