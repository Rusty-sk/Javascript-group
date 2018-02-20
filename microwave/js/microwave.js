
var keypadDisplay =[];
var clockDisplay = [];
var timerDisplay = [];
var time =0;
var counter = 0;
var timer;
var myTime;
var keypad = "";
var clockOn;
var pCount; 
// ****************
//  display

// ****************   

function display() {
    if (timerDisplay.length!=0){
        
        // document.getElementById("clockDisplay").innerHTML = timerDisplay[0] + ":" + timerDisplay[1];
        
        return;
        
    }else if(keypadDisplay.length != 0) {
        if (keypadDisplay[1]<10){
            document.getElementById("clockDisplay").innerHTML = keypadDisplay[0] + ":0" + keypadDisplay[1];
        }else{
            document.getElementById("clockDisplay").innerHTML = keypadDisplay[0] + ":" + keypadDisplay[1];
        }

        return;
    }else{
        clockOn = 1;
        
        if (clockDisplay[0]>12){
            document.getElementById("clockDisplay").innerHTML = (clockDisplay[0]-12) + ":" + clockDisplay[1] + "pm";
            startClock();

        }else{
            document.getElementById("clockDisplay").innerHTML = clockDisplay[0] + ":" + clockDisplay[1] +"am";
            startClock();
        }
    }
}




// ****************
//  Key pad

// ****************

function number(value){

    if (value == 'start' ){
        if (keypadDisplay.length==0){
            return;
        }else{
            clockOn = 0;
            pCount=0;
            if (timerDisplay.length==0){
                keypad="";
                timerDisplay = keypadDisplay;
                keypadDisplay = [];
                startTimer();
                
            }else{
                startTimer();
                return;
            }
        }
    } else if (value == "clear"){
        stopTimer();
        return;
    
    } else if (keypad.length>3){
        pCount=0;
        value="";
        return;

    }else {
        clockOn = 0;
        pCount=0;
        keypad += value;
        var timeEntry= parseFloat(keypad);
        if (keypad>100){
            var minuteEntry;
            minuteEntry = Math.trunc(timeEntry/100);
            var secondsEntry = timeEntry - minuteEntry*100;
            keypadDisplay = [minuteEntry, secondsEntry];
            display();
        }else{
            keypadDisplay = [0, timeEntry];
            display();
        }
    }

}


// ****************
//  Timer Section

// ****************



function stopTimer(){
    pCount++;
        if (pCount==2){
            keypad = "";
            time = 0;
            keypadDisplay = [0, "00"];
            display();
            return;
        }else if(pCount==3){
            keypadDisplay = [];
        }else{

        }
}




function startTimer() {
//   var presentTime = document.getElementById('clockDisplay').innerHTML;
//   var timerDisplay = presentTime.split(/[:]+/);

  if(timerDisplay[1]==-1 && timerDisplay[0]>0){
    timerDisplay[0] --;
    timerDisplay[1] = 59;
    }
    s = timerDisplay[1];
    timerDisplay[1]--;
    

    if (s < 10 ) {
        s = "0" + s;
    }
    
    if (timerDisplay[0]==0 && timerDisplay[1]==0){
        finished();
    }else{

       document.getElementById('clockDisplay').innerHTML =
       timerDisplay[0] + ":" + s;
    
      setTimeout("startTimer()" , 1000);
    }
      
}

function finished() {

    //  document.getElementById('clockDisplay').innerHTML = "DONE";
    timerDisplay = []; 
       var i=1;
    setInterval(function(){
            if (i<4){
                document.getElementById('clockDisplay').innerHTML = "Done";
                i++;
            }else{
                display();
                }
            
            },3000);

}




// ****************
//  Clock Section

// ****************


function startClock(){

    if(clockOn==0){
        display();
        return;
    }else{
    
    setInterval("getTime()", 5000);
    }
}

function getTime(){
    
    var today = new Date();

    
    var hour = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();

    if(minutes<10){
      minutes = '0' + minutes;
    }

    myTime = hour + ":" + minutes;
    clockDisplay = myTime.split(/[:]+/);
    display();
    

    

}

