"use strict";

import { getPairs, goalsScored } from "./helperFunctions.js";
import {
  groupA,
  groupB,
  groupC,
  groupD,
  groupE,
  groupF,
  groupG,
  groupH,
} from "./groups.js";

(() => {
  const groupStageContainer = document.querySelector(".groupstage");
  const playOffDiv = document.querySelector(".playoff");
  const winnerDiv = document.querySelector(".winner");
  const newWC = document.getElementById("new");

  let groupResults = [];
  let playOffResult = "";
  let playOffTeams = [];
  let quoterFinals = [];
  let semiFinals = [];
  let finals = [];
  let leftSideOfPlayOff = [];
  let rightSideOfPlayoff = [];
  let leftSideQuoterFinals = [];
  let rightSideQuoterFinals = [];
  let leftSideSemiFinals = [];
  let rightSideSemiFinals = [];
  let winnerOfWC = [];

  //playing single match in group stage , function for group stage match
  function gameMatch(homeTeam, awayTeam, round) {
    const homeTeamScore = goalsScored();
    const awayTeamScore = goalsScored();

    homeTeam.goalsScored += homeTeamScore;
    awayTeam.goalsScored += awayTeamScore;
    homeTeam.goalsConceded += awayTeamScore;
    awayTeam.goalsConceded += homeTeamScore;

    if (homeTeamScore > awayTeamScore) {
      homeTeam.points += 3;
      homeTeam.win += 1;
      awayTeam.loss += 1;
    } else if (homeTeamScore === awayTeamScore) {
      homeTeam.points += 1;
      awayTeam.points += 1;
      homeTeam.draw += 1;
      awayTeam.draw += 1;
    } else {
      awayTeam.points += 3;
      awayTeam.win += 1;
      homeTeam.loss += 1;
    }

    homeTeam.goalDifference = homeTeam.goalsScored - homeTeam.goalsConceded;
    awayTeam.goalDifference = awayTeam.goalsScored - awayTeam.goalsConceded;

    //rendering data into HTML document
    let groupResult = `
    <p><strong>${round}</strong> ${homeTeam.name} ${homeTeamScore} : ${awayTeamScore}  ${awayTeam.name} <p>
     `;

    groupResults.push(groupResult);
  }

  //ranking teams in group
  function groupRank(group) {
    //sorting groups by points
    const groupRankingByPoints = group.sort((a, b) => b.points - a.points);

    //Sorting group by other params
    const groupRanking = groupRankingByPoints.sort((a, b) => {
      if (b.points === a.points) {
        return b.goalDifference - a.goalDifference;
      }
      if (b.goalDifference === a.goalDifference) {
        return b.goalsScored - a.goalsScored;
      }
    });
    // CHECK THIS ***

    //making array for playoffs (1/8, 1/4, 1/2)
    const groupWinners = groupRanking.slice(0, 2);
    const [home, away] = groupWinners;
    playOffTeams.push(home, away);
  }

  //making table after group stage
  function makeTable(group) {
    let tablerow = "";

    group.forEach((team) => {
      tablerow += `
    <tr>
    <td>${team.name} (${team.rank})</td>
    <td>${team.win} ${team.draw} ${team.loss}</td>
    <td>${team.goalsScored}:${team.goalsConceded}</td>
    <td>${team.points}</td>
  </tr>`;
    });

    const table = document.createElement("table");
    table.innerHTML = tablerow;
    groupStageContainer.appendChild(table);
    tablerow = "";
  }

  function makeScoreSheet(groupName) {
    const groupHolder = document.createElement("div");
    const groupNameHolder = document.createElement("h3");
    groupNameHolder.innerText = groupName;
    groupHolder.appendChild(groupNameHolder);
    groupHolder.classList.add("group");
    groupResults.forEach((res) => {
      groupHolder.innerHTML += res;
    });

    groupStageContainer.appendChild(groupHolder);

    groupResults = [];
  }

  //function for playing all round matches in group stage
  function groupStage(group, groupName) {
    const pairs = getPairs();
    let round;

    pairs.forEach((pair, index) => {
      if (index === 0 || index === 1) {
        round = "Round 1:";
      }
      if (index === 2 || index === 3) {
        round = "Round 2:";
      }
      if (index === 4 || index === 5) {
        round = "Round 3:";
      }

      gameMatch(group[pair[0]], group[pair[1]], round);
    });

    groupRank(group);
    makeScoreSheet(groupName);
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
  function gameMatchPlayOff(homeTeam, awayTeam, phase, arr) {
    let homeTeamScore = goalsScored();
    let awayTeamScore = goalsScored();

    if (homeTeamScore > awayTeamScore) {
      arr.push(homeTeam);
    }
    if (homeTeamScore === awayTeamScore) {
      0.5 > Math.random() ? arr.push(homeTeam) : arr.push(awayTeam);
    }
    if (homeTeamScore < awayTeamScore) {
      arr.push(awayTeam);
    }

    playOffResult += `<p><strong>${phase}</strong>  ${homeTeam.name} ${homeTeamScore} : ${awayTeamScore}  ${awayTeam.name} <p>`;

    playOffDiv.innerHTML = playOffResult;
  }

  //function for making fixtures in playOff
  function playoffGames(playOffTeams) {
    playOffTeams.forEach((team) => {
      team.groupIndex % 2 === 0
        ? leftSideOfPlayOff.push(team)
        : rightSideOfPlayoff.push(team);
    });

    for (let i = 0; i < playOffTeams.length / 2; i++) {
      gameMatchPlayOff(
        leftSideOfPlayOff[i],
        rightSideOfPlayoff[i],
        "1/8",
        quoterFinals
      );
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

    winnerDiv.innerText = `WINNER OF WC2022: ${winnerOfWC[0].name}`;
  }

  playoffGames(playOffTeams);

  newWC.addEventListener("click", function () {
    location.reload();
  });
})();
