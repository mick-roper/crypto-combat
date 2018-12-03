const fight = {
  players: [2]
};

module.exports.join = player => {
  if (!player) {
    throw new Error('no player')
  }

  if (!fight.players.find(player)) {
    fight.players.push(player);
  }
}

module.exports.leave = player => {
  if (!player) {
    throw new Error('no player');
  }
}