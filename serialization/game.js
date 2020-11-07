module.exports.serialize = (game) => {
    const newGame = {
        ...game, 
        players: [...game.players.values()]
    }

    return JSON.stringify(newGame);
} 
// name as key instead of connection as key for coding symetry 
module.exports.deserialize = (str) => {
    const obj = JSON.parse(str);
   
    return obj;
}