
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
    var tDone=true;
    var clock;
  
    // ****************
    //  display

    // ****************   

    function display() {
        if (timerDisplay.length!=0){
            
            
            
            return;
            
        }else if(keypadDisplay.length != 0) {
            if (keypadDisplay[1]<10){
                document.getElementById("clockDisplay").innerHTML = keypadDisplay[0] + ":0" + keypadDisplay[1];
            }else{
                document.getElementById("clockDisplay").innerHTML = keypadDisplay[0] + ":" + keypadDisplay[1];
            }

            return;
        }else if(keypadDisplay.length==0 && timerDisplay.length==0 && tDone==true ){
            clockOn = 1;
            
            if (clockDisplay[0]>12){
                document.getElementById("clockDisplay").innerHTML = (clockDisplay[0]-12) + ":" + clockDisplay[1] + "pm";
                startClock();

            }else{
                document.getElementById("clockDisplay").innerHTML = clockDisplay[0] + ":" + clockDisplay[1] +"am";
                startClock();
            }
        }else{
            return;
        }
    }




    // ****************
    //  Key pad

    // ****************

    function number(value){

        if (value == 'start' ){
            if (keypadDisplay.length==0 && tDone==true){
                return;
            }else{
                tDone=false;
                clockOn = 0;
                pCount=0;
                if (timerDisplay.length==0){
                    keypad="";
                    timerDisplay = keypadDisplay;
                    keypadDisplay = [];
                    document.getElementById('startBtn').disabled = true;
                    startTimer();
                    
                }else{
                    document.getElementById('startBtn').disabled = true;
                    startTimer();
                    return;
                }
            }
        } else if (value == "clear"){
            if(tDone==false){
                document.getElementById('startBtn').disabled = false;
                stopTimer();
            }else if(pCount==2){ 
                keypadDisplay=[];
                document.getElementById('startBtn').disabled = false;
                display();
                return;
            }else{
                pCount++;
                document.getElementById('startBtn').disabled = false;
                keypad = "";
                time = 0;
                keypadDisplay = [0, 0];
                display();
                return;
        }
        
        } else if (keypad.length>3){
            pCount=0;
            value="";
            return;

        }else {
            clearInterval(clock);
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
                keypadDisplay = [];
                timerDisplay= [];
                tDone=true;
                display();
                return;
            }else{
                clearTimeout(timer);

            }
    }

    function restart(){

    }




    function startTimer() {
    
    

    if(timerDisplay[1]==-1 && timerDisplay[0]>0){
            timerDisplay[0] --;
            timerDisplay[1] = 59;
        }
        timerDisplay[1]--;
        s = timerDisplay[1];

        if (s < 10 ) {
            s = "0" + s;
        }
        
        if (timerDisplay[0]==0 && timerDisplay[1]==-1){
            finished();
            return;
        }else{

        document.getElementById('clockDisplay').innerHTML =
        timerDisplay[0] + ":" + s;
        timer= setTimeout("startTimer()",1000);
        }
        
    }
    
        function finished() {
            $( function() {
            document.getElementById('clockDisplay').innerHTML = "DONE"; 
            $("#clockDisplay").fadeOut( 1500, function(){ });
            $("#clockDisplay").fadeIn( 1500, function(){ });
            $("#clockDisplay").fadeOut( 1500, function(){ });
            $("#clockDisplay").fadeIn( 1500, function(){ });
            timerDisplay = [];
            tDone=true;
            clearInterval(clock);
            clockOn=1;
            document.getElementById('startBtn').disabled = false;
            
        } );
    }
    



    // ****************
    //  Clock Section

    // ****************


    function startClock(){

        if(clockOn==0){
            display();
            return;
        }else{
        
        clock=setInterval("getTime()", 20000);
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

