//making sheet for matches at group stage
export function getPairs() {
  const pairs = [];

  for (let i = 0; i <= 2; i++) {
    for (let j = 3; j > 0; j--) {
      if (i !== j && pairs.length < 6) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
}

//function for scored goals
export function goalsScored() {
  const goals = [
    0, 0, 1, 1, 2, 3, 4, 0, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 1, 2, 3, 1, 2, 3,
    0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 2, 1, 3, 1, 2, 3, 0, 1, 2,
  ];
  goals.sort(() => Math.random() - 0.5);
  return goals[0];
}
