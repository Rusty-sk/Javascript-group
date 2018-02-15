var display = "";
var calculation = 0;

function number(value){

  if (value == '=' ){
      var calculation = eval(display);
      document.getElementById("display").innerHTML = "=" + calculation;

  } else if (value == "C"){
      display = "";
      calculation = 0;
      document.getElementById("display").innerHTML = "";
  }else {
      display += value;
      var pValue = parseFloat(value);

      document.getElementById("display").innerHTML = display;
  }

}
