console.log("working. . . ");
const noughts = -1;
const crosses = 1;
const empty = 0;
const x = 1;
const o = -1;
const b = 0;
let count = 0;

// const board = [x, o, b, b, o, b, o, x, x];
const board = Array(9).fill(0);
const maxPly = 5;

function convert(n) {
  if (n === empty) return ". ";
  else if (n === noughts) return "O ";
  else return "X ";
}

function display(b) {
  console.log(convert(b[0]) + convert(b[1]) + convert(b[2]));
  console.log(convert(b[3]) + convert(b[4]) + convert(b[5]));
  console.log(convert(b[6]) + convert(b[7]) + convert(b[8]));
  if (winningPosition(b, noughts)) console.log("Noughts wins!");
  if (winningPosition(b, crosses)) console.log("Crosses wins!");
  console.log("------------");
}

function getPossibleMoves(b) {
  const possibleMoves = [];
  for (let i = 0; i < b.length; ++i)
    if (b[i] === 0) possibleMoves.push({ index: i, score: 0 });

  return possibleMoves;
}

function winningPosition(b, p) {
  if (b[0] === p && b[1] === p && b[2] === p) return true;
  if (b[3] === p && b[4] === p && b[5] === p) return true;
  if (b[6] === p && b[7] === p && b[8] === p) return true;
  if (b[0] === p && b[3] === p && b[6] === p) return true;
  if (b[1] === p && b[4] === p && b[7] === p) return true;
  if (b[2] === p && b[5] === p && b[8] === p) return true;
  if (b[0] === p && b[4] === p && b[8] === p) return true;
  if (b[2] === p && b[4] === p && b[6] === p) return true;

  return false;
}

function examine(b, pm, player, ply, original) {
  if (ply <= maxPly) {
    count += 1;
    b[pm.index] = player;
    display(b);
    if (winningPosition(b, player)) {
      original.score += 1;
      return;
    }

    const possibleMoves = getPossibleMoves(b);
    for (let i = 0; i < possibleMoves.length; ++i) {
      examine(b.slice(), possibleMoves[i], -player, ply + 1, original);
    }
  }
}

function analyze() {
  const possibleMoves = getPossibleMoves(board);

  for (let i = 0; i < possibleMoves.length; ++i) {
    examine(board.slice(), possibleMoves[i], noughts, 1, possibleMoves[i]);
  }

  console.log(possibleMoves);
}

// display(board);
analyze();
console.log("Positions examined: " + count);
