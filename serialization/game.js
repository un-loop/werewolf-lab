const omitConnection = ({connection, ...rest}) => rest;

module.exports.serialize = (game) => {
    const newGame = {
        ...game,
        players: game.players.map((player) => omitConnection(player))
    }

    return JSON.stringify(newGame);
}
