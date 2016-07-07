// register a new element called proto-element
Polymer({
    is: "proto-element",
    // add a callback to the element's prototype
    ready: function() {
        this.textContent = "I'm a proto-element. Check out my prototype!";
    }
});

var	Sttopwatch = function() {
    // Private vars
    var	sttopwatchStartAt	= 0;	// Time of last sttopwatchStart / resume. (0 if not running)
    var	lapTime	= 0;	// Time on the clock when last sttopwatchStopped in milliseconds

    var	now	= function() {
        return (new Date()).getTime();
    };

    // Public methods
    // SttopwatchStart or resume
    this.sttopwatchStart = function() {
        sttopwatchStartAt	= sttopwatchStartAt ? sttopwatchStartAt : now();
    };

    // SstopwatchStop or pause
    this.sttopwatchStop = function() {
        // If running, sttopwatchUpdate elapsed time otherwise keep it
        lapTime	= sttopwatchStartAt ? lapTime + now() - sttopwatchStartAt : lapTime;
        sttopwatchStartAt	= 0; // Paused
    };

    // SstopwatchReset
    this.sttopwatchReset = function() {
        lapTime = sttopwatchStartAt = 0;
    };

    // Duration
    this.time = function() {
        return lapTime + (sttopwatchStartAt ? now() - sttopwatchStartAt : 0); 
    };
};

var x = new Sttopwatch();
var $time;
var clocktimer;

function pad(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
}

function formatTime(time) {
    var h = m = s = ms = 0;
    var newTime = '';

    h = Math.floor( time / (60 * 60 * 1000) );
    time = time % (60 * 60 * 1000);
    m = Math.floor( time / (60 * 1000) );
    time = time % (60 * 1000);
    s = Math.floor( time / 1000 );
    ms = time % 1000;

    newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
    return newTime;
}

function sttopwatchShow() {
    $time = document.getElementById('time');
    sttopwatchUpdate();
}

function sttopwatchUpdate() {
    $time.innerHTML = formatTime(x.time());
}

function sttopwatchStart() {
    clocktimer = setInterval("sttopwatchUpdate()", 1);
    x.sttopwatchStart();
}

function sttopwatchStop() {
    x.sttopwatchStop();
    clearInterval(clocktimer);
}

function sttopwatchReset() {
    sttopwatchStop();
	  x.sttopwatchReset();
	  sttopwatchUpdate();
}

$(document).ready(function(){
    sttopwatchShow();
    $($time).on('click', function(){
        if($($time).attr('data-stopwatch-status')=='1'){
            $($time).attr('data-stopwatch-status','0');
            sttopwatchStop();
        }else{
            $($time).attr('data-stopwatch-status','1');
            sttopwatchStart();
        }
    });
});
