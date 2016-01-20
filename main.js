'use strict';

//////
// Still need to implement
//---Log Player Turns,
//---Block placeMarker() if not your turn
//---Block duplicate selection of a box.
//---Place Marker
//---Win Condition
//---I broke my code and could not implement these---//


/////////////////////////////////////////////
///////////      THE GAME        ////////////
/////////////////////////////////////////////
$(document).ready(function() {

  $("#submit").click(userName);
  $( ".col-xs-4").on("click", placeMarker)

  ref.child("cells").on("value", function(){
    boardUpdate()
})

  $("button#reset").on("click", function(){
    console.log("it worked");
    ref.remove();
    $(".playerInput").children().show();
  });

  ref.child('turn').on("value", function(snap){
    turnFunction(snap);
    })
  })
/////////////////////////////////////////////
///////     CONNECT TO FIREBASE      ////////
/////////////////////////////////////////////

var timestamp = Date.now();

var ref = new Firebase('https://tiktaktow.firebaseio.com/');
var cellsRef = ref.child('cells');
var $selectedBox;
var playersRef = ref.child('players');
var playerName;
var player;
var playerTurn;
var player1;
var player2;

/////////////////////////////////////////////
///////     SET CELLS TO FIREBASE    ////////
/////////////////////////////////////////////

ref.child('cells').on('value', function(snap){
  if(!snap.val()){
    ref.child('cells').set({
      cell1: '',
      cell2: '',
      cell3: '',
      cell4: '',
      cell5: '',
      cell6: '',
      cell7: '',
      cell8: '',
      cell9: ''
   });
  }else{
    placeMarker();
  }
});


/////////////////////////////////////////////
//////   FIREBASE PLAYER PRESENCE   /////////
/////////////////////////////////////////////

function userName(){
  playerName = $("#userName").val()
  console.log("userName:", playerName);
  playersRef.once("value", function(snapshot){
    console.log("userName snapshot:", snapshot.val());

    if(!snapshot.val()){

      playersRef.push($("#userName").val())
      player = $("#userName").val()
//      player1 = snapshot.players.key()
      console.log("player key:", snapshot.val())
      $(".playerInput").children().hide();
      $("#currentPlayer").text(player);
    }else if (Object.keys(snapshot.val()).length === 1) {

      playersRef.push($("#userName").val())
      player = $("#userName").val()
//      player2 = playersRef.key()
      console.log("player key:", snapshot.val())
      $(".playerInput").children().hide();
      $("#currentPlayer").text(player);
      startGame();
    }else{
      return
    }
  });
}

/////////////////////////////////////////////
///////////// GAME /// RULES ////////////////
/////////////////////////////////////////////

function placeMarker(){
  console.log("click event working", this)
  $selectedBox = $(this);

if(ref.turn === "'"+playerName+"'"){
  $selectedBox.text("x")
}else{
    $selectedBox.text("o")
}

      switch($selectedBox.attr('id')){
        case "cell1":
                      console.log("Cell1");
                      cellsRef.update({cell1: player});
                      break;
        case "cell2":
                      console.log("Cell2")
                      cellsRef.update({cell2: player});
                      break;
        case "cell3":
                      console.log("Cell3")
                      cellsRef.update({cell3: player});
                      break;
        case "cell4":
                      console.log("Cell4")
                      cellsRef.update({cell4: player});
                      break;
        case "cell5":
                      console.log("Cell5")
                      cellsRef.update({cell5: player});
                      break;
        case "cell6":
                      console.log("Cell6")
                      cellsRef.update({cell6: player});
                      break;
        case "cell7":
                      console.log("Cell7")
                      cellsRef.update({cell7: player});
                      break;
        case "cell8":
                      console.log("Cell8")
                      cellsRef.update({cell8: player});
                      break;
        case "cell9":
                      console.log("Cell9");
                      cellsRef.update({cell9: player});
                      break;

}

ref.child('turn').set("'"+player+"'")

  checkWin();
}

/////////////////////////////////////////////
///////////// CHECK /// WIN  ////////////////
/////////////////////////////////////////////


function checkWin(){

  var winConditions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ];

}

/////////////////////////////////////////////
/////////// PLAYER /// TURN /////////////////
/////////////////////////////////////////////

function turnFunction(snap){
  var whoseTurnIsIt = snap.val();
  console.log("Turn:", whoseTurnIsIt)

}

/////////////////////////////////////////////
////////////  START  THE  GAME  /////////////
/////////////////////////////////////////////

function startGame() {
// make a turn child in firebase, ititialize it to player!;
ref.child('turn').set("'"+player+"'")
}

function boardUpdate(){
console.log("snapTo:");

}
