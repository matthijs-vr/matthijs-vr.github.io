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

var started = false;
var playing = false;

var currentDirection; //1 is top, 2 is right, 3 is down, 4 is left
var currentDifficulty = 0; //0 is easy, 1 is normal, 2 is hard, 3 is insane
var currentDifficultytext = "Easy";
var currentSize = 2;
var currentLength;
var pausebuttontext = "Pause";

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
  changedifficulty("Easy");
}

function generateboard(){
  board =             [[400,399,398,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
  headrow = 0;
  headcol = 3;
  lowesttailnumber = 398;
  playing = true;
  started = true;
  currentDirection = 2;
  currentLength = 4;
  clearInterval(difficultyInterval);
  difficultyInterval = setInterval(move, intervaltime);
  pausebuttontext = "Pause"
  changedifficulty(currentDifficultytext);
  document.getElementById("length").innerHTML = "Length: " + currentLength;
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
  return "<table class=\"boardclass" + currentSize + "\">"+board_inner_html+"</table>";
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
  dead = movesnake(nextheadrow, nextheadcol);
  if (dead == 1) {
    return;
  }
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
    currentLength = 402 - lowesttailnumber;
    document.getElementById("length").innerHTML = "Length: " + currentLength;
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
    return 1;
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
  changedifficulty(currentDifficultytext);
}

function changedifficulty(currentDifficultytext) {
  let difficulty_html = "<button onclick=\"difficulty()\" class=\"button\">" + currentDifficultytext + "</button>"
  let button_html = "<button onclick=\"size()\" class=\"button\">Change size</button><div class=\"division\"></div><button onclick=\"reset()\" class=\"button\">New game</button><div class=\"division\"></div><button onclick=\"pause()\" class=\"button\">" + pausebuttontext + "</button><div class=\"division\"></div>"
  document.getElementById("buttons_container").innerHTML = "<center>" + button_html + difficulty_html + "</center>"
}

function size(){
  currentSize++;
  if (currentSize == 4) {
    currentSize = 0;
  }
  draw_board(board);
}

function pause(){
  if (!started) {
    return;
  }
  if (playing) {
    clearInterval(difficultyInterval);
    playing = false;
    pausebuttontext = "Play";
    changedifficulty(currentDifficultytext);
  } else {
    difficultyInterval = setInterval(move, intervaltime);
    pausebuttontext = "Pause"
    playing = true;
    changedifficulty(currentDifficultytext);
  }
}

function death(){
  let board_inner_html = "";
  for (let i = 0; i < board.length; i++){
    let row_html = "";
    for (let j = 0; j < board[i].length; j++){
      if (board[i][j] == 0){
        row_html += "<td class=\"deadTile\">" + board[i][j] + "</td>";
      }else if (board[i][j] == 1) {
        row_html += "<td class=\"deadTile\">" + board[i][j] + "</td>";
      }else if (board[i][j] == 2) {
        row_html += "<td class=\"deadSnake\">" + board[i][j] + "</td>";
      }else{
        row_html += "<td class=\"deadSnake\">" + board[i][j] + "</td>";
      }
    }
    row_html += "</tr>";
    board_inner_html += row_html;
  }
  let board_html = "<table class=\"boardclass" + currentSize + "\">"+board_inner_html+"</table>";
  document.getElementById("board_container").innerHTML = board_html;
  playing = false;
  started = false;
}
