
(function ticTacToe() {
    var start = document.getElementById('startGame'); 
    var play = document.getElementById('board'); 
    var startButton = document.getElementById('start');
    var player = document.getElementById('players'); 
    var playerOne = document.getElementById('onePlayer');
    var playerTwo = document.getElementById('twoPlayers');
    var header = document.getElementsByTagName('header'); 
    var xoDisplay = document.getElementById('xo'); 
    var playerO = document.getElementById('player1');
    var playerX = document.getElementById('player2'); 
    var boxes = document.getElementsByClassName('boxes')[0];
    var end = document.getElementById('finish'); 
    var endMessage = document.getElementsByClassName('message'); 
    var newGameButton = document.getElementById('new-game'); 
    var boardArray = [];
    var scoreArray = [['0','1','2'], ['3','4','5'], ['6','7','8'], 
                      ['0','3','6'], ['1','4','7'], ['2','5','8'],
                      ['0','4','8'], ['2','4','6']]; 
    var xArray = [];
    var oArray = []; 
    var activePlayer = ""; 
    var numOfPlayers; 
    var playerOneName; 
    var playerTwoName;
    var nameDisplay1;
    var nameDisplaySpace;
    var nameDisplay2; 
    
    
    
    //Set New Game screen if page initialized or refreshed
    //Only displays the start screen. 
    function startPage() {
        start.style.display = ""; 
        startButton.style.display = "";
        playerOne.style.display = ""; 
        playerTwo.style.display = "";
        //Hides the board div
        play.style.display = "none"; 
        
        //Hides the players div, "How Many Players"
        player.style.display = "none";
        
        //Hides end screen
        end.style.display = "none";
        
        //Resets active player 
        activePlayer = "";
        
        //Resets arrays
        boardArray = ['0','1','2','3','4','5','6','7','8'];
        xArray = []; 
        oArray = []; 
    } 
    
    function endGame() {
        end.style.display =""; 
        play.style.display = "none";
        nameDisplay1.remove();
        nameDisplaySpace.remove();
        nameDisplay2.remove();
    }
    
    //Executes when start button is selected 
    var game = function() {
        //displays the "How Many Players" div
        header[1].children[0].innerText = 'How many player?'; 
        player.style.display = "";
        
        //hides the start/ new game screen
        startButton.style.display = "none";
    };
    
    //Creates input type=text for players to enter their name(s)
    //and appends the element as a child to the header tag within 
    //the "players" div.
    //called in newGame & nextDecision functions
    var playerName = function() {
        var playerInput = document.createElement('INPUT'); 
        playerInput.setAttribute('type', 'text');
        playerInput.setAttribute('placeholder', 'Enter your name');
        playerInput.setAttribute('id', 'name'); 
        playerInput.className = "player-name" ; 
        header[1].appendChild(playerInput);
    };
    
    
    //Creates Next button for players name entry 
    //and appends the element as a child to the header tag within 
    //the "players" div. 
    //called in newGame & nextDecision functions
     var nextButton = function() {
         var next = document.createElement('BUTTON');
         next.setAttribute('type', 'button'); 
         next.innerText = 'Next';
         next.setAttribute('id', 'next-step'); 
         next.onclick = nextDecision; 
         next.className = 'next';
         header[1].appendChild(next); 
     }; 
    
    //Sets the number of players based on the "Number of Players" 
    //button selected, sets the first player name entry page
    //and adds gamePlay onclick event to each tic-tac-toe box. 
    var newGame = function() {
        numOfPlayers = this.innerText;
        playerOne.style.display = 'none';
        playerTwo.style.display = 'none'; 
        header[1].children[0].innerText = 'Player One:';
        playerName();
        nextButton();
        //Adds onclick event to each list item.
        for(var i = 0; i < 9; i++) {
            boxes.children[i].onclick = gamePlay;
        }
    };
    
    //insert player names into game board
    //div id='xo' in html, represented as var xoDisplay
    function insertName() {
        //Creates p element for player one, centered below 'O'
        nameDisplay1 = document.createElement('P'); 
        nameDisplay1.innerText = playerOneName;
        nameDisplay1.className = 'name-position'; 
        xoDisplay.appendChild(nameDisplay1);
        
        //Space between player one & two name elements.
        nameDisplaySpace = document.createElement('P'); 
        nameDisplaySpace.className = 'name-position center-position'; 
        xoDisplay.appendChild(nameDisplaySpace);
        
        //Creates p element for player Two, centered below 'X'
        nameDisplay2 = document.createElement('P'); 
        nameDisplay2.innerText = playerTwoName;
        nameDisplay2.className = 'name-position'; 
        xoDisplay.appendChild(nameDisplay2);
        gamePlay(); 
    }
    
        //Next button logic, used to navigate through player name
        //entry and used to insert player name(s) and/or computer
        //into the game board
    var nextDecision = function() {
        var oneName = document.getElementById('name');
        var next = document.getElementById('next-step');
        if (header[1].children[0].innerText == 'Player One:' && numOfPlayers == 2){
            playerOneName = oneName.value; 
            header[1].children[0].innerText = 'Player Two:';
            oneName.remove();
            next.remove(); 
            playerName(); 
            nextButton(); 
        } else if (header[1].children[0].innerText == 'Player Two:' && numOfPlayers == 2) {
            playerTwoName = oneName.value; 
            oneName.remove();
            next.remove(); 
            start.style.display = "none";
            play.style.display = '';
            insertName();
        } else {
            playerOneName = oneName.value;
            playerTwoName = 'Computer'; 
            oneName.remove();
            next.remove(); 
            start.style.display = "none";
            play.style.display = '';
            insertName(); 
        }
    };
    
 
    
    //Provides index number of the selected tic-tac-toe box.
    //called in gamePlay() 
    function listIndex(node) {
        var children = node.parentNode.childNodes;
        var num = 0;
        for (var i=0; i<children.length; i++) {
             if (children[i]==node) return num;
             if (children[i].nodeType==1) num++;
        }
        return -1;
    }
    
    //Compare player's selected boxes against scoreArray, 
    //scoreArray contains tic tac toe combinations for winning the game.
    function gameScore(array) {
        var match;
        var result = 'continue'; 
        for (var i = 0; i < scoreArray.length; i++) {
            match = 0;
            for (var j = 0; j < array.length; j++){
                var check = array[j].toString();
                if (scoreArray[i].indexOf(check) >= 0) {
                    match++;
                }
            }
            if (match >= 3) {
                result = 'winner';
                break;
            } else {
                continue;
            }
        }
        return result;
    }
    
    //generates random number for computer's turn. 
    function computer() {
        var num = Math.floor((Math.random() * boardArray.length));
        console.log(boardArray[num]); 
        return boardArray[num];  
    }

    //Play Game 
    function gamePlay() {
        var boxIndex; 
        var boardValue;
        var arrayIndex;
        var xResult = '';
        var oResult = ''; 
        if (activePlayer == "") {
            console.log("new game"); 
            activePlayer = 'o'; 
            playerO.className = 'players active';
            playerX.className = 'players'; 
            for(var i = 0; i < boardArray.length; i++) {
                boardValue = boardArray[i];
                //console.log(boardValue +'x');
                boxes.children[boardValue].className = 'box o';
            }
        //Update X's selected box and set active player to O
        } else if (activePlayer == 'x' && (this.className == 'box x' || 
                  (playerTwoName == 'Computer' && boardArray.length > 0))) {
            activePlayer = 'o'; 
            playerO.className = 'players active';
            playerX.className = 'players'; 
            for(var a = 0; a < boardArray.length; a++) {
                boardValue = boardArray[a];
                //console.log(boardValue +'x');
                boxes.children[boardValue].className = 'box o';
            }
               console.log('X Turn');
               if (playerTwoName == 'Computer') {
                   boxIndex = computer();
               } else {
                    boxIndex = listIndex(this);   
               }
                boxes.children[boxIndex].className = 'box box-filled-2';
                arrayIndex = boardArray.indexOf(boxIndex.toString());
            if (arrayIndex >= 0) {
                xArray.push(boxIndex); 
                boardArray.splice(arrayIndex, 1);
                xResult = gameScore(xArray); 
                console.log(xArray);
            }
            
        //Update 'O's selected box and set active player to X  
        } else if (activePlayer == 'o' && this.className == 'box o') {
            activePlayer = 'x'; 
            playerX.className = 'players active';
            playerO.className = 'players'; 
            for(var j = 0; j < boardArray.length; j++) {
                boardValue = boardArray[j];
                //console.log(boardValue +'o');
                boxes.children[boardValue].className = 'box x';
            }
                boxIndex = listIndex(this); 
                boxes.children[boxIndex].className = 'box box-filled-1';
                arrayIndex = boardArray.indexOf(boxIndex.toString());
           if (arrayIndex >= 0) {
                oArray.push(boxIndex); 
                boardArray.splice(arrayIndex, 1);
                oResult = gameScore(oArray); 
                console.log(oArray);
            }
        }
        //Determine if either player has won, if there is a draw or to continue
        if (oResult == 'winner') {
           setTimeout(endGame, 500);
            end.className = 'screen screen-win screen-win-one';   
            endMessage[0].innerText = "Winner!";
            header[3].children[1].innerText = playerOneName; 
        } else if (xResult == 'winner') {
            setTimeout(endGame, 500);
            end.className = 'screen screen-win screen-win-two';   
            endMessage[0].innerText = "Winner!";
            header[3].children[1].innerText = playerTwoName;
        } else if (boardArray.length == 0) {
            setTimeout(endGame, 500);
            end.className = 'screen screen-win screen-win-tie';   
            endMessage[0].innerText = "It's a draw!";
            header[3].children[1].innerText = '';
        } else if (activePlayer == 'x' && playerTwoName == 'Computer' && boardArray.length > 0) {
            setTimeout(gamePlay, 1000); 
        }
    }
    
    startPage(); 
    newGameButton.onclick = startPage; 
    playerOne.onclick = newGame;
    playerTwo.onclick = newGame; 
    startButton.onclick = game; 
}()); 

