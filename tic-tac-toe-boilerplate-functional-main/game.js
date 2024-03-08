  document.addEventListener("DOMContentLoaded", function() {
    const boxes = document.querySelectorAll('.box');
    const modal = document.getElementById('myModal');
    const messageDiv = document.getElementById('message');
    const playAgainButton = document.getElementById('button');
  
    let currentPlayer = 'X';
    let moves = 0;
    let gameOver = false;
  
    function checkWinner() {
      const winningCombos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
      ];
  
      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (boxes[a - 1].innerText && boxes[a - 1].innerText === boxes[b - 1].innerText && boxes[a - 1].innerText === boxes[c - 1].innerText) {
          gameOver = true;
          return boxes[a - 1].innerText;
        }
      }
  
      if (moves === 9) {
        gameOver = true;
        return "draw";
      }
  
      return null;
    }
  
    function handleBoxClick(e) {
      const box = e.target;
      const id = parseInt(box.id);
  
      if (!box.innerText && !gameOver) {
        box.innerText = currentPlayer;
        box.classList.add(currentPlayer);
        moves++;
        const winner = checkWinner();
        if (winner === 'draw') {
            messageDiv.innerText = "It's a draw!";
            modal.style.display = 'block';
        } else if (winner)   {
          messageDiv.innerText = `'${winner}' won the game !`;
          modal.style.display = 'block';
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    }
  
    function handleReset() {
      boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove('X', 'O');
      });
      currentPlayer = 'X';
      moves = 0;
      gameOver = false;
      modal.style.display = 'none';
    }
  
    boxes.forEach(box => {
      box.addEventListener('click', handleBoxClick);
    });
  
    playAgainButton.addEventListener('click', handleReset);
  });