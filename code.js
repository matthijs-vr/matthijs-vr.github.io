//Schrijf hier je JavaScript-code
let totalseconds = 0;
var minutes;
var seconds;
var timeNow;
var fullsecond = true;
var intervaltime = 400;
timeInterval = setInterval(time, 1000);
difficultyInterval = setInterval(move, intervaltime);

var headrow;
var headcol;
var lowesttailnumber;

var board;

var playing = false;

var currentDirection; //1 is top, 2 is right, 3 is down, 4 is left
var currentDifficulty = 0; //0 is easy, 1 is normal, 2 is hard, 3 is insane

function time(){
  if (!playing) {
    return;
  }
  minutes = Math.floor(totalseconds / 60);
  seconds = totalseconds % 60;
  if (minutes < 10){
    minutes = "0" + minutes;
  }
  if (seconds < 10){
    seconds = "0" + seconds;
  }
  timeNow = minutes + ":" + seconds;
  document.getElementById("clock").innerHTML = timeNow;
  totalseconds += 1;
}

window.onload = function() {
  generateboard();
  let difficulty_html = "<button onclick=\"difficulty()\" class=\"difficulty\">Easy</button>"
  let button_html = "<button onclick=\"reset()\" class=\"button\">New game</button>"
  document.getElementById("buttons_container").innerHTML = "<center>" + button_html + "<div class=\"division\"></div>" + difficulty_html + "</center>"
}

function generateboard(){
  board =             [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,2,400,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,398,399,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
   draw_board(board);
}

function reset(){
  totalseconds = 0;
  time();
  generateboard();
  generatefood(board);
  headrow = 9;
  headcol = 9;
  lowesttailnumber = 398;
  playing = true;
  currentDirection = 1;
}

function generate_board_html(board){
  let board_inner_html = "";
  for (let i = 0; i < board.length; i++){
    let row_html = "";
    for (let j = 0; j < board[i].length; j++){
      if (board[i][j] == 0){
        row_html += "<td class=\"emptytile\">" + board[i][j] + "</td>";
      }else if (board[i][j] == 1) {
        row_html += "<td class=\"food\">" + board[i][j] + "</td>";
      }else if (board[i][j] == 2) {
        row_html += "<td class=\"snake\">" + board[i][j] + "</td>";
      }else{
        row_html += "<td class=\"snake\">" + board[i][j] + "</td>";
      }
    }
    row_html += "</tr>";
    board_inner_html += row_html;
  }
  return "<table class=\"boardclass\">"+board_inner_html+"</table>";
}

function draw_board(board){
  let board_html = generate_board_html(board);
  document.getElementById("board_container").innerHTML = board_html;
}

window.addEventListener("keyup", (e) => {
  if (e.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  if (e.key == "ArrowDown") {
    if (currentDirection == 1) {
      return;
    }
    currentDirection = 3
  } else if (e.key == "ArrowLeft") {
    if (currentDirection == 2) {
      return;
    }
    currentDirection = 4
  } else if (e.key == "ArrowUp") {
    if (currentDirection == 3) {
      return;
    }
    currentDirection = 1
  } else if (e.key == "ArrowRight") {
    if (currentDirection == 4) {
      return;
    }
    currentDirection = 2
  }
  e.preventDefault();
}, true);

function move(){
  if (!playing) {
    return;
  }
  // if (fullsecond) {
  //   fullsecond = false;
  //   time();
  // } else {
  //   fullsecond = true;
  // }
  // time();
  var nextheadrow;
  var nextheadcol;
  if (currentDirection == 1) {
    if (headrow == 0) {
      death();
      return;
    } else {
      nextheadrow = headrow-1
      nextheadcol = headcol
    }
  }else if (currentDirection == 2) {
    if (headcol == 19) {
      death();
      return;
    } else {
      nextheadrow = headrow
      nextheadcol = headcol+1
    }
  }else if (currentDirection == 3) {
    if (headrow == 19) {
      death();
      return;
    } else {
      nextheadrow = headrow+1
      nextheadcol = headcol
    }
  }else if (currentDirection == 4) {
    if (headcol == 0) {
      death();
      return;
    } else {
      nextheadrow = headrow
      nextheadcol = headcol-1
    }
  }
  movesnake(nextheadrow, nextheadcol);
  headrow = nextheadrow
  headcol = nextheadcol
  draw_board(board);
}

function movesnake(nextheadrow, nextheadcol) {
  if (board[nextheadrow][nextheadcol] == 1) {
    lowesttailnumber--;
    board[headrow][headcol] = lowesttailnumber;
    if (currentDirection == 1) {
      board[headrow-1][headcol] = 2;
    }else if (currentDirection == 2) {
      board[headrow][headcol+1] = 2;
    }else if (currentDirection == 3) {
      board[headrow+1][headcol] = 2;
    }else if (currentDirection == 4) {
      board[headrow][headcol-1] = 2;
    }
    generatefood(board);
  } else if (board[nextheadrow][nextheadcol] == 0) {
    board[headrow][headcol] = lowesttailnumber;
    if (currentDirection == 1) {
      board[headrow-1][headcol] = 2;
    }else if (currentDirection == 2) {
      board[headrow][headcol+1] = 2;
    }else if (currentDirection == 3) {
      board[headrow+1][headcol] = 2;
    }else if (currentDirection == 4) {
      board[headrow][headcol-1] = 2;
    }
    movetail(headrow, headcol, lowesttailnumber);
  } else {
    death();
    return;
  }
}

function movetail(headrow, headcol, lowestnumber) {
  var rowi = -1;
  while (rowi < 2) {
    var coli = -1;
    while (coli < 2) {
      if (rowi != coli) {
        if (0 <= headrow + rowi && headrow + rowi < 20 && 0 <= headcol + coli && headcol + coli < 20) {
          if (board[headrow + rowi][headcol + coli] == lowestnumber) {
            if (lowestnumber != 400) {
              lowestnumber++;
              board[headrow + rowi][headcol + coli] = lowestnumber;
              movetail(headrow+rowi, headcol+coli, lowestnumber);
              return;
            } else {
              board[headrow + rowi][headcol + coli] = 0;
              return;
            }
          }
        }
      }
      coli++;
    }
    rowi++;
  }
}

function generatefood(board) {
  let row = Math.floor(Math.random() * 20);
  let col = Math.floor(Math.random() * 20);
  if (board[row][col] != 0) {
    generatefood(board);
    return;
  }
  board[row][col] = 1;
}

function difficulty() {
  if (playing) {
    return;
  }
  currentDifficulty++;
  if (currentDifficulty == 4) {
    currentDifficulty = 0;
  }
  var currentDifficultytext;
  if (currentDifficulty == 0) {
    currentDifficultytext = "Easy"
    intervaltime = 400;
  } else if (currentDifficulty == 1) {
    currentDifficultytext = "Normal"
    intervaltime = 250;
  } else if (currentDifficulty == 2) {
    currentDifficultytext = "Hard"
    intervaltime = 150;
  } else if (currentDifficulty == 3) {
    currentDifficultytext = "Insane"
    intervaltime = 100;
  }
  clearInterval(difficultyInterval)
  difficultyInterval = setInterval(move, intervaltime);
  let difficulty_html = "<button onclick=\"difficulty()\" class=\"difficulty\">" + currentDifficultytext + "</button>"
  let button_html = "<button onclick=\"reset()\" class=\"button\">New game</button>"
  document.getElementById("buttons_container").innerHTML = "<center>" + button_html + "<div class=\"division\"></div>" + difficulty_html + "</center>"
}

function death(){
  alert("You died!");
  playing = false;
}
