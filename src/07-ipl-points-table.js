/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  // Your code here
  if (!Array.isArray(matches) || matches.length === 0) {
    return [];
  }
  const pointsTable = {};
  for (const match of matches) {
    const { team1, team2, result, winner } = match; //object deconstruct
    if (!pointsTable[team1]) {
      // pointsTable[match.team1] = {};  //instead of creating a new empty object we need to create a object with properties right ?
      pointsTable[team1] = {
        team: team1,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
    if (!pointsTable[team2]) {
      pointsTable[team2] = {
        team: team2,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
    // { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
    // pointsTable[match.team1] = {team : match.team1 , won : match.winner } //This was wrong because we were making a new object with every loop
    //UPDATING THE PROPERTIES
    pointsTable[team1].played++;
    pointsTable[team2].played++;
    if (result === "win") {
      if (winner === team1) {
        pointsTable[team1].won++;
        pointsTable[team1].points += 2;
        pointsTable[team2].lost++;
      } else {
        pointsTable[team2].won++;
        pointsTable[team2].points += 2;
        pointsTable[team1].lost++;
      }
    } else {
      if (result === "tie") {
        pointsTable[team1].tied++;
        pointsTable[team2].tied++;
        pointsTable[team1].points += 1;
        pointsTable[team2].points += 1;
      } else {
        pointsTable[team1].noResult++;
        pointsTable[team2].noResult++;
        pointsTable[team1].points += 1;
        pointsTable[team2].points += 1;
      }
    }
  }
  const pointsTableArray = Object.values(pointsTable);
  pointsTableArray.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return a.team.localeCompare(b.team);
  });
  return pointsTableArray;
}
