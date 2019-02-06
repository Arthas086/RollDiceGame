var turn=null;
var notBusy=null;
function pageLoad() {

}
function newClick() {
//reset UI scores
    document.getElementById('p1Score').innerText="0";
    document.getElementById('p2Score').innerText="0";
    document.getElementById('p1RScore').innerText="0";
    document.getElementById('p2RScore').innerText="0";
//reset UI
    document.getElementById('dice').style.display="none";
    document.getElementById('leftPlayer').style.backgroundColor="#dddddd";
    document.getElementById('rightPlayer').style.backgroundColor="aliceblue";
//turn associate
    turn=true;
    notBusy=true;
//buttons work
    document.getElementById('roll').getElementsByTagName('p')[0].onclick=function () {
        rollClick()
    };
    document.getElementById('hold').getElementsByTagName('p')[0].onclick=function () {
        holdClick()
    };
}
var interval;
function rollClick() {
    if(notBusy){
        if (turn != null) {
            var temp;
            var dice = document.getElementById('dice');
            dice.style.display = "inline";
            notBusy=false;
            interval = setInterval(function () {
                temp = Math.floor(Math.random() * 6 + 1);
                dice.src = temp + ".png";
            }, 200);
            setTimeout(function () {
                clearInterval(interval);
                if (turn) {
                    if (temp !== 1) {
                        document.getElementById('p1RScore').innerText = eval(document.getElementById('p1RScore').innerText) + temp;
                    } else {
                        document.getElementById('p1RScore').innerText = "0";
                        turn = false;
                        document.getElementById('leftPlayer').style.backgroundColor = "aliceblue";
                        document.getElementById('rightPlayer').style.backgroundColor = "#dddddd";
                    }
                } else {
                    if (temp !== 1) {
                        document.getElementById('p2RScore').innerText = eval(document.getElementById('p2RScore').innerText) + temp;
                    } else {
                        document.getElementById('p2RScore').innerText = "0";
                        turn = true;
                        document.getElementById('leftPlayer').style.backgroundColor = "#dddddd";
                        document.getElementById('rightPlayer').style.backgroundColor = "aliceblue";
                    }
                }
                notBusy=true;
            }, 1000);
        }
    }
}
function holdClick() {
    if(notBusy){
        if (turn) {
            document.getElementById('p1Score').innerText = eval(document.getElementById('p1RScore').innerText) + eval(document.getElementById('p1Score').innerText);
            document.getElementById('p1RScore').innerText = "0";
            turn = false;
            document.getElementById('leftPlayer').style.backgroundColor = "aliceblue";
            document.getElementById('rightPlayer').style.backgroundColor = "#dddddd";
            if (eval(document.getElementById('p1Score').innerText) >= 100) {
                document.getElementById('p1Score').innerText = "Win";
                //unable buttons
                document.getElementById('roll').getElementsByTagName('p')[0].onclick = null;
                document.getElementById('hold').getElementsByTagName('p')[0].onclick = null;
            }
        } else {
            document.getElementById('p2Score').innerText = eval(document.getElementById('p2RScore').innerText) + eval(document.getElementById('p2Score').innerText);
            document.getElementById('p2RScore').innerText = "0";
            turn = true;
            document.getElementById('leftPlayer').style.backgroundColor = "#dddddd";
            document.getElementById('rightPlayer').style.backgroundColor = "aliceblue";
            if (eval(document.getElementById('p2Score').innerText) >= 100) {
                document.getElementById('p2Score').innerText = "Win";
                //unable buttons
                document.getElementById('roll').getElementsByTagName('p')[0].onclick = function () {
                    win();
                };
                document.getElementById('hold').getElementsByTagName('p')[0].onclick = function () {
                    win();
                };
            }
        }
    }
}
function win() {
    alert("Tap New Game To Restart The Game");
}