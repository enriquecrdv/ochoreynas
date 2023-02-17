const cells = document.querySelectorAll('td');
const queens = [];

function checkQueenInPath(cell) {
  for (let i = 0; i < queens.length; i++) {
    const q = queens[i];
    if (q === cell) {
      continue;
    }
    if (q.dataset.row == cell.dataset.row) {
      return true;
    }
    if (q.dataset.col == cell.dataset.col) {
      return true;
    }
    if (q.dataset.diag1 == cell.dataset.diag1) {
      return true;
    }
    if (q.dataset.diag2 == cell.dataset.diag2) {
      return true;
    }
  }
  return false;
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (queens.length === 8) {
      return;
    }

    if (queens.includes(cell)) {
      queens.splice(queens.indexOf(cell), 1);
      cell.classList.remove('queen');
    } else {
      if (!checkQueenInPath(cell)) {
        queens.push(cell);
        cell.classList.add('queen');
      }
    }

    queens.forEach(q1 => {
      q1.classList.remove('attack');
      queens.forEach(q2 => {
        if (q1 !== q2) {
          if (q1.dataset.row === q2.dataset.row ||
              q1.dataset.col === q2.dataset.col ||
              q1.dataset.diag1 === q2.dataset.diag1 ||
              q1.dataset.diag2 === q2.dataset.diag2) {
            q1.classList.add('attack');
          }
        }
      });
    });

    if (queens.length === 8) {
      document.getElementById('message').textContent = '¡Ganaste!';
    } else {
      document.getElementById('message').textContent = '';
    }
  });

  const row = cell.parentNode.rowIndex;
  const col = cell.cellIndex;
  cell.dataset.row = row;
  cell.dataset.col = col;
  cell.dataset.diag1 = row - col;
  cell.dataset.diag2 = row + col;
});