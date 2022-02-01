let delete_svg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="white" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>';

$(document).ready(function() {
  drawLettersGrid();
  drawKeyboard();
})

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
      }

      row.append(letter_key);
    }

    keyboard_area.append(row);
  }
}
