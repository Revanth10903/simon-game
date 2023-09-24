var gamepattern=[];
var userclickedpattern=[];
var level=0;
var started= false;
var buttoncolours=["red","blue","green","yellow"];


$(document).keypress(function (){
    if(!started){
        $('#level-title').text("level-"+level);
        nextSequence();
        started=true;
    }
});



$(".btn").click(function(){
    var userchosencolor=$(this).attr("id");
    userclickedpattern.push(userchosencolor);
    playsound(userchosencolor);
    animateit(userchosencolor);
    check(userclickedpattern.length-1);
});



function nextSequence(){
    userclickedpattern = [];

    level++;
    $("#level-title").text("Level " + level);
    randnumber= Math.floor(Math.random()*4);
    
    randomcolour= buttoncolours[randnumber];
    gamepattern.push(randomcolour);
    $("#"+randomcolour).fadeIn(100).fadeOut(100).fadeIn(100);
    animateit(randomcolour);
    playsound(randomcolour);
}


function playsound(colour){
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}


function animateit(colour){
    $('#'+colour).addClass("pressed");
    setTimeout(function () {
        $('#'+colour).removeClass("pressed");
    }, 100);
}

function check(lev){
    if(gamepattern[lev]===userclickedpattern[lev]){
    
        if(userclickedpattern.length===gamepattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        var aud= new Audio("sounds/wrong.mp3");
        aud.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
    }
}

function startover(){
    level=0;
    started=false;
    gamepattern=[];
}