
var display = "";
var time =0;
var counter = 0;
var timer;
var myTime;
   

// ****************
//  Key pad

// ****************

function number(value){
    
    if (value == 'Start' ){
        

    } else if (value == "Clear"){
        display = "";
        time = 0;
        document.getElementById("clockDisplay").innerHTML = "";
    }else {
        display += value;
        var pValue = parseFloat(value);
        
        document.getElementById("clockDisplay").innerHTML = display;
    }

}

// ****************
//  Timer Section

// ****************



function startTimer() {
    document.getElementById('clockDisplay').innerHTML ="<h1>" + counter--  + "</h1>";
    document.getElementById('startBtn').disabled=true;
    timer= setTimeout("startTimer()", 1000);

}


function stopTimer(){
            clearTimeout(timer);
            document.getElementById('startBtn').disabled = false;

            counter=0;
}



// ****************
//  Clock Section

// ****************


function startClock(){

    getTime();

    setInterval("getTime()",1000);
}

function getTime(){
    
    var today = new Date();

    
    var hour = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();

    if(seconds<10){

      seconds = '0' + seconds;
    }

    if(minutes<10){
      minutes = '0' + minutes;
    }

    if(hour<10){
      hour = '0' + hour;
    }

    myTime = hour + ":" + minutes + ":" + seconds;
    document.getElementById('clock').value = myTime;
    document.getElementById('demo').innerHTML = today;

}

