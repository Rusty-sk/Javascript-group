


var display = "";
var calculation = 0;

function number(value){

  if (value == '=' ){
      var calculation = eval(display);
      document.getElementById("display").value = "=" + calculation;

  } else if (value == "AC"){
      display = "";
      calculation = 0;
      document.getElementById("display").value = "";

      // percent function
  } else if (value == "%"){
      display = "";
      var percent = (value / display);
      document.getElementById("display").value = sqrt;

      // square root function
  } else if (value == "squarer"){
        display += "";
        var sqrt = Math.sqrt(parseValue(display));
        document.getElementById("display").value = display;


  }else {
      display += value;
      var pValue = parseFloat(value);

      document.getElementById("display").value = display;
  }

}
