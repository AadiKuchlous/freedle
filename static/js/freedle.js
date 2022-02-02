let delete_svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="white" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>';

//initialize empty guess matrix
var guesses = [...Array(6)].map(e => new Array());

$(document).ready(function() {
  drawLettersGrid();
  drawKeyboard();

  // Handling the user keyboard input
  $(this).keypress(function(e) {
    // e.preventDefault();
    handleKeyInput(e.which);
  });


  $(this).keyup(function(e){
    if (e.which == 8) {
      handleKeyInput(e.which);
    }
  });
})


// Drawing the Empty Grid for the guesses
function drawLettersGrid() {
  let grid_area = $('#tiles-grid');
  for (y = 0; y < 6; y ++) {
    let row = $('<div/>').addClass('tile-row').attr('row', y);
    for (x = 0; x < 5; x ++) {
      let tile = $('<div/>').addClass('game-tile');
      let tile_id = `tile-${x}-${y}`;
      tile.attr('id', tile_id);
      tile.attr('x', x);
      tile.attr('y', y);

      row.append(tile);
    }
    grid_area.append(row);
  }
}


// Drawing the Keyboard
function drawKeyboard() {
  let keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete']
  ];

  let keyboard_area = $('#keyboard-area');

  for (row_index = 0; row_index < keyboardLayout.length; row_index++) {
    let row_letters = keyboardLayout[row_index];

    let row = $('<div/>').addClass('keyboard-row');

    for (letter_index = 0; letter_index < row_letters.length; letter_index++) {
      let letter = row_letters[letter_index];
      let letter_key = $('<div/>').addClass('keyboard-key').attr('id', letter).text(letter);

      if (letter == 'delete') {
        letter_key.html(delete_svg);
        letter_key.on('click', function(){ handleKeyInput(8); })
      }

      else if (letter == "enter") {
        letter_key.on('click', function(){ handleKeyInput(13); })
      }

      else {
        letter_key.on('click', function(){ handleKeyInput(letter.charCodeAt(0)); })
      }

      row.append(letter_key);
    }

    keyboard_area.append(row);
  }
}

function handleKeyInput(asc) {
  let guess_no = getGuessNo();

  // Letter Keys Handler
  if (asc >= 97 && asc <= 122) {
    let letter = String.fromCharCode(asc);

    if (guesses[guess_no].length == 5) {
      return
    }

    guesses[guess_no].push(letter);
  }

  // Enter Key Pressed
  if (asc == 13) {
    if (guesses[guess_no].length == 5) {
      console.log('evaluating');
      $(`.tile-row[row=${guess_no}]`).attr('evaluated', 'true');
    }
    else {
      return;
    }
  }

  // Backspace Key Pressed
  if (asc == 8) {
    console.log('backspace');
    if (guesses[guess_no].length > 0) {
      guesses[guess_no].pop();
    }
  }

  writeLettersInGrid();

  console.log(guesses);
}


function getGuessNo() {
  for (i = 0; i < guesses.length; i++) {
    if (guesses[i].length <= 5 && !($(`.tile-row[row=${i}]`).attr('evaluated'))) {
      return(i);
    }
  }
}


function writeLettersInGrid() {

  $(document).find('.game-tile').text('');

  for (guess_no = 0; guess_no < guesses.length; guess_no++) {
    guess = guesses[guess_no];

    for (i = 0; i < guess.length; i++) {
      let letter = guess[i];
      let grid_row = $(`.tile-row[row=${guess_no}]`);
      let tile = grid_row.find(`.game-tile[x=${i}]`)
      tile.text(letter);
    }
  }
}
