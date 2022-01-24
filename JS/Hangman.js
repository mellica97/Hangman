var sports = [
    "Archery",
    "Aerobics",
    "Boating",
    "Bowling",
    "Basketball",
    "Canoeing",
    "Canoeing",
    "Chess",
    "Gliding",
    "Karate",
    "Jogging",
    "Kickball",
    "Powerlifting",
    "Paintball"
]
var minute = 9;
var second = 60;
let answer = '';
let maxWrong = 10;
let mistakes = 0;
let guessed = [];
let wrongGuessed=[];
let wordStatus = null;

function countDown(){
    document.getElementById("keyboard").style.display = 'block';
   myinterval= setInterval( function(){
        if ( minute==0 && second==1)
        {
            document.getElementById('counter').innerHTML= "00:00";
            document.getElementById('keyboard').innerHTML="you Lost!";
        }
        else {
            second--;
            if (second == 0)
            {
                minute--;
                second = 60;
                if (minute == 0){
                    minute = minute;
                }
            }
            if(minute.toString().length == 1){
                minute= "0"+ minute;
            }
            if(second.toString().length == 1){
                second= "0"+ second;
            }
    
    
            document.getElementById('counter').innerHTML= minute + ":" + second;
        }
    
    },1000)


}



function randomWord() {
    answer = sports[Math.floor(Math.random() * sports.length)];
    
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
        <button  class="btn btn-lg btn-primary m-2" id = '` + letter +`' onclick= "handleguess('` + letter +`')">
            ` + letter + `

        </button>
        
        ` ).join('');
        document.getElementById('keyboard').innerHTML= buttonsHTML;
}


function handleguess(chosenletter){
    guessed.indexOf(chosenletter) === -1 ? guessed.push(chosenletter) : null;
    document.getElementById(chosenletter).setAttribute('disabled', true);

    if (answer.indexOf(chosenletter) >= 0)
    {
        guessedWord();
        checkIfGameWon();
    }
    else if (answer.indexOf(chosenletter) >= -1)
    {
        wrongGuessed.push(chosenletter);
        mistakes++
        updatemistakes();
        checkIfGameLost();
        updateHangmanapicture();
        document.getElementById('wrongGuesses').innerHTML= wrongGuessed
    }

}
function updatemistakes(){
    document.getElementById('mistakes').innerHTML = mistakes;
}

function guessedWord(){
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;

}
function checkIfGameWon(){
    if(wordStatus === answer)
    {
        document.getElementById('keyboard').innerHTML="you won!";
    }
}

function checkIfGameLost(){
    if(mistakes === maxWrong)
    {
        document.getElementById('wordSpotlight').innerHTML = "the correct answer was " + answer;
        document.getElementById('keyboard').innerHTML="you Lost!";
        
    }
    
}

function updateHangmanapicture(){
    document.getElementById('hangmanpic').src = './images/' + mistakes + '.gif'


}

function reset(){

    mistakes = 0;
    guessed = [];
    wrongGuessed=[];
    document.getElementById('hangmanpic').src = './images/0.gif';
    document.getElementById('wrongGuesses').innerHTML= '';
    document.getElementById('counter').innerHTML= "10:00";
    document.getElementById("keyboard").style.display = 'none';


    randomWord();
    guessedWord();
    updatemistakes();
    generateButtons();
    clearInterval( myinterval);
    

}
document.getElementById('maxwrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();