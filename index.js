const groupStageContainer = document.querySelector(".groupstage");
const playOffDiv = document.querySelector(".playoff");
const winnerDiv = document.querySelector(".winner");
const newWC = document.getElementById("new");
let groupresults = [];
let tablerow = "";
let playOffresult = "";
let playOffTeams = [];
let quoterFinals = [];
let semiFinals = [];
let finals = [];
let winner;
let leftSide = [];
let rightSide = [];
let leftSideQuoterFinals = [];
let rightSideQuoterFinals = [];
let leftSideSemiFinals = [];
let rightSideSemiFinals = [];
let winnerOfWC = [];

//function for scored goals
function teamGoalsScored() {
  const goals = [
    0, 0, 1, 1, 2, 3, 4, 0, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 1, 2, 3, 1, 2, 3,
    0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 2, 1, 3, 1, 2, 3, 0, 1, 2,
  ];
  goals.sort((a, b) => Math.random() - 0.5);
  return (goal = goals[0]);
}
let score;
let score1;

//groups data
// prettier-ignore
const groupA = [{name: "Katar", rank: 51, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0, win:0, draw:0, loss:0, groupIndex: 1, teamIndex: 1},
                  {name: "Ekvador",rank: 46, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0, groupIndex: 1,teamIndex: 2},
                  {name: "Senegal", rank: 20, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0, groupIndex: 1, teamIndex: 3}, 
                  { name: "Holandija",rank: 10,points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 1, teamIndex: 4}];

// prettier-ignore
const groupB = [{name: "Engleska", rank: 5, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 2, teamIndex: 5},
{name: "Iran",rank: 21, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 2, teamIndex: 6},
{name: "SAD", rank: 15, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 2,teamIndex: 7}, 
{ name: "Ukrajina",rank: 27,points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,   groupIndex: 2, teamIndex: 8}];

// prettier-ignore
const groupC = [{name: "Argentina", rank: 4, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 3,teamIndex: 9},
{name: "Saudijska Arabija",rank: 49, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 3,teamIndex: 10},
{name: "Meksiko", rank: 9, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 3, teamIndex: 11}, 
{ name: "Poljska",rank: 10,points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,   groupIndex: 3, teamIndex: 12}];

// prettier-ignore
const groupD = [{name: "Francuska", rank: 51, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 4, teamIndex: 13},
{name: "Peru",rank: 46, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 4, teamIndex: 14 },
{name: "Danska", rank: 20, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 4, teamIndex: 15}, 
{ name: "Tunis",rank: 10,points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,   groupIndex: 4, teamIndex: 16}];

// prettier-ignore
const groupE = [{name: "Spanija", rank: 7, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 5, teamIndex: 17},
  {name: "Novi Zeland",rank: 101, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 5,teamIndex: 18 },
  {name: "Nemacka", rank: 12, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 5,teamIndex: 19 }, 
  { name: "Japan",rank: 23,points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,   groupIndex: 5,teamIndex: 20}];

// prettier-ignore
const groupF = [{name: "Belgija", rank: 2, points: 0, goalsScored: 0, goalsConcided: 0,win:0, draw:0, loss:0,  goalDifference: 0, groupIndex: 6, teamIndex: 21 },
  {name: "Kanada",rank: 38, points: 0, goalsScored: 0, goalsConcided: 0,win:0, draw:0, loss:0,  goalDifference: 0, groupIndex: 6, teamIndex:22 },
  {name: "Maroko", rank: 24, points: 0, goalsScored: 0, goalsConcided: 0,win:0, draw:0, loss:0,  goalDifference: 0, groupIndex: 6, teamIndex:23 }, 
  { name: "Hrvatska",rank: 16,points: 0, goalsScored: 0, goalsConcided: 0,win:0, draw:0, loss:0,  goalDifference: 0,  groupIndex: 6, teamIndex: 24}];

// prettier-ignore
const groupG = [{name: "Brazil", rank: 1, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0, win:0, draw:0, loss:0,  groupIndex: 7, teamIndex: 25},
  {name: "Srbija",rank: 25, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 7, teamIndex: 26},
  {name: "Svajcarska", rank: 14, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 7, teamIndex: 27}, 
  { name: "Kamerun",rank: 37,points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,   groupIndex: 7, teamIndex: 28 }];

// prettier-ignore
const groupH = [{name: "Portugal", rank: 8, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 8, teamIndex: 29 },
{name: "Gana",rank: 60, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 8, teamIndex:30},
{name: "Urugvaj", rank: 13, points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,  groupIndex: 8, teamIndex: 31}, 
{ name: "Juzna Koreja",rank: 29,points: 0, goalsScored: 0, goalsConcided: 0, goalDifference: 0,win:0, draw:0, loss:0,   groupIndex: 8, teamIndex: 32}];
//end of group data

//making sheet for matches at group stage
let pairs = [];
for (let i = 0; i <= 2; i++) {
  for (let j = 3; j > 0; j--) {
    if (i !== j && pairs.length < 6) {
      pairs.push([i, j]);
    }
  }
}

//playing single match in group stage , function for group stage match
function gameMatch(team1, team2, round) {
  score = teamGoalsScored();
  score1 = teamGoalsScored();

  team1.goalsScored += score;
  team2.goalsScored += score1;
  team1.goalsConcided += score1;
  team2.goalsConcided += score;
  if (score > score1) {
    team1.points += 3;
    team1.win += 1;
  } else if (score === score1) {
    team1.points += 1;
    team2.points += 1;
    team1.draw += 1;
    team2.draw += 1;
  } else {
    team2.points += 3;
    team2.win += 1;
  }

  team1.goalDifference = team1.goalsScored - team1.goalsConcided;
  team2.goalDifference = team2.goalsScored - team2.goalsConcided;
  let groupresult;
  // //rendering data into HTML document
  groupresult = `
    <p><strong>${round}</strong> ${team1.name} ${score} : ${score1}  ${team2.name} <p>
     `;
  groupresults.push(groupresult);
}

//ranking teams in group
function groupRank(arr) {
  //sorting grops by points
  const groupRankingByPoints = arr.sort((a, b) => b.points - a.points);
  //Sorting gruop by other params
  groupRanking = groupRankingByPoints.sort((a, b) => {
    if (b.points === a.points) {
      return b.goalDifference - a.goalDifference;
    } else if (b.goalDifference === a.goalDifference) {
      return b.goalsScored - a.goalsScored;
    }
  });

  //making array for playoffs (1/8, 1/4, 1/2)
  const groupWinners = groupRankingByPoints.slice(0, 2);
  const [home, away] = groupWinners;
  playOffTeams.push(home, away);
}

//making table after group stage
function makeTable(groupRanking) {
  groupRanking.forEach((team) => {
    tablerow += `
    <tr>
    <td>${team.name} (${team.rank})</td>
    <td>${team.win} ${team.draw} ${team.loss}</td>
    <td>${team.goalsScored}:${team.goalsConcided}</td>
    <td>${team.points}</td>
  </tr>`;
  });

  const table = document.createElement("table");
  table.innerHTML = tablerow;
  //groupHolder.appendChild;
  groupStageContainer.appendChild(table);
  tablerow = "";
}

//function for playing all round matches in group stage
function groupStage(arr, groupName) {
  pairs.forEach((pair, index) => {
    if (index === 0 || index === 1) {
      round = "Round 1:";
    } else if (index === 2 || index === 3) {
      round = "Round 2:";
    } else {
      round = " Round 3:";
    }
    gameMatch(arr[pair[0]], arr[pair[1]], round);
  });

  groupRank(arr);
  makeScoreSheet(groupName);
}

function makeScoreSheet(groupName) {
  const groupHolder = document.createElement("div");
  const groupNameHolder = document.createElement("h3");
  groupNameHolder.innerText = groupName;
  groupHolder.appendChild(groupNameHolder);
  groupHolder.classList.add("group");
  groupresults.forEach((res) => {
    groupHolder.innerHTML += res;
  });

  groupStageContainer.appendChild(groupHolder);

  groupresults = [];
}

groupStage(groupA, "Group A");
makeTable(groupA);

groupStage(groupB, "Group B");
makeTable(groupB);

groupStage(groupC, "Group C");
makeTable(groupC);
groupStage(groupD, "Group D");
makeTable(groupD);
groupStage(groupE, "Group E");
makeTable(groupE);
groupStage(groupF, "Group F");
makeTable(groupF);
groupStage(groupG, "Group G");
makeTable(groupG);
groupStage(groupH, "Group H");
makeTable(groupH);

//PLAYOFF
//function for deciding winner in playoff matches
function gameMatchPlayOff(team1, team2, phase, arr) {
  let score = teamGoalsScored();
  let score1 = teamGoalsScored();

  if (score > score1) {
    arr.push(team1);
  } else if (score === score1) {
    0.5 > Math.random() ? arr.push(team1) : arr.push(team2);
  } else {
    arr.push(team2);
  }

  playOffresult += `<p><strong>${phase}</strong>  ${team1.name} ${score} : ${score1}  ${team2.name} <p>`;

  playOffDiv.innerHTML = playOffresult;
}

//function for making fixtures in playOff
function playoffGames(playOffTeams) {
  playOffTeams.forEach((team) => {
    team.groupIndex % 2 === 0 ? leftSide.push(team) : rightSide.push(team);
  });

  for (let i = 0; i < playOffTeams.length / 2; i++) {
    gameMatchPlayOff(leftSide[i], rightSide[i], "1/8", quoterFinals);
  }

  quoterFinals.forEach((team, index) => {
    team.teamIndex = index;
    team.teamIndex % 2 === 0
      ? leftSideQuoterFinals.push(team)
      : rightSideQuoterFinals.push(team);
  });

  for (let i = 0; i < quoterFinals.length / 2; i++) {
    gameMatchPlayOff(
      leftSideQuoterFinals[i],
      rightSideQuoterFinals[i],
      "1/4",
      semiFinals
    );
  }

  semiFinals.forEach((team, index) => {
    team.teamIndex = index;
    team.teamIndex % 2 === 0
      ? leftSideSemiFinals.push(team)
      : rightSideSemiFinals.push(team);
  });

  for (let i = 0; i < semiFinals.length / 2; i++) {
    gameMatchPlayOff(
      leftSideSemiFinals[i],
      rightSideSemiFinals[i],
      "1/2",
      finals
    );
  }

  gameMatchPlayOff(finals[0], finals[1], "Final", winnerOfWC);

  console.log(winnerOfWC);
  winnerDiv.innerText = `WINNER OF WC2022: ${winnerOfWC[0].name}`;
}

playoffGames(playOffTeams);

newWC.addEventListener("click", function () {
  location.reload();
});
