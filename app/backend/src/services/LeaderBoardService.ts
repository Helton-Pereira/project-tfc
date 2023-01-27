import IAcumulatedRank from '../interfaces/acumulatedRank';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import IMatch from '../interfaces/matchInterface';
import ITeam from '../interfaces/teamInterface';

const win = (match: IMatch, acc: IAcumulatedRank) => {
  const obj = {
    totalPoints: acc.totalPoints + 3,
    totalVictories: acc.totalVictories += 1,
    totalDraws: acc.totalDraws,
    totalLosses: acc.totalLosses,
    goalsFavor: acc.goalsFavor + match.homeTeamGoals,
    goalsOwn: acc.goalsOwn + match.awayTeamGoals,
  };

  return obj;
};

const draw = (match: IMatch, acc: IAcumulatedRank) => {
  const obj = {
    totalPoints: acc.totalPoints + 1,
    totalVictories: acc.totalVictories,
    totalDraws: acc.totalDraws += 1,
    totalLosses: acc.totalLosses,
    goalsFavor: acc.goalsFavor + match.homeTeamGoals,
    goalsOwn: acc.goalsOwn + match.awayTeamGoals,
  };

  return obj;
};

const defeat = (match: IMatch, acc: IAcumulatedRank) => {
  const obj = {
    totalPoints: acc.totalPoints,
    totalVictories: acc.totalVictories,
    totalDraws: acc.totalDraws,
    totalLosses: acc.totalLosses += 1,
    goalsFavor: acc.goalsFavor + match.homeTeamGoals,
    goalsOwn: acc.goalsOwn + match.awayTeamGoals,
  };

  return obj;
};

const rankStatus = (matches: IMatch[]) => {
  const matchStatus = matches.reduce((acc, cur) => {
    if (cur.homeTeamGoals > cur.awayTeamGoals) {
      return win(cur, acc);
    }
    if (cur.homeTeamGoals === cur.awayTeamGoals) {
      return draw(cur, acc);
    }
    return defeat(cur, acc);
  }, {
    totalPoints: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  });
  return matchStatus;
};

const createRankData = async (team: ITeam) => {
  const matches = await Matches.findAll({
    where: { homeTeamId: Number(team.id), inProgress: false },
  });

  const ranking = rankStatus(matches);

  const teamStatus = {
    name: team.teamName,
    totalPoints: ranking.totalPoints,
    totalGames: matches.length,
    totalVictories: ranking.totalVictories,
    totalDraws: ranking.totalDraws,
    totalLosses: ranking.totalLosses,
    goalsFavor: ranking.goalsFavor,
    goalsOwn: ranking.goalsOwn,
    goalsBalance: (ranking.goalsFavor - ranking.goalsOwn),
    efficiency: ((ranking.totalPoints / (matches.length * 3)) * 100).toFixed(2),
  };

  return teamStatus;
};

const homeLeaderBoard = async () => {
  const teams = await Teams.findAll();
  const leaderBoard = await Promise.all(teams.map(async (team) => {
    const teamRank = await createRankData(team);
    return teamRank;
  }));

  leaderBoard.sort((a, b) => {
    if (b.totalPoints === a.totalPoints) {
      if (b.goalsBalance === a.goalsBalance) return b.goalsFavor - a.goalsFavor;
      return b.goalsBalance - a.goalsBalance;
    }
    return b.totalPoints - a.totalPoints;
  });

  return { status: 200, leaderBoard };
};

export default { homeLeaderBoard };
