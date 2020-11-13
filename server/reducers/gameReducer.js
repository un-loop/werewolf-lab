const { SIGNUP } = require("../../enums/gameStatus");

const minPlayers = 7;
const maxPlayers = 50;
const ADD_PLAYER = "game/addPlayer";
const REMOVE_PLAYER = "game/removePlayer";

const initialState = {
    players: [],
    gameStatus: SIGNUP,
    eventLog: []
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
            console.log('adding player');
            return {
                ...state,
                players: [...state.players, action.payload],
                eventLog: [
                    ...state.eventLog,
                    `Player ${action.payload.name} joined`
                ]
            };
        case REMOVE_PLAYER:
            const removeIndex = state.players.findIndex(
                (player) => player.connection === action.payload.connection
            );

            return {
                ...state,
                players: state.players.filter((player) => {
                    return player.connection !== action.payload.connection;
                }),
                eventLog: [
                    ...state.eventLog,
                    `Player ${state.players[removeIndex].name} left`
                ]
            };
        default:
            return state;
    }
};

// ACTION CREATORS
const getAddPlayerAction = (name, connection) => {
    return {
        type: ADD_PLAYER,
        payload: {
            name,
            connection
        }
    };
};

const getRemovePlayerAction = (connection) => {
    return {
        type: REMOVE_PLAYER,
        payload: {
            connection
        }
    };
};

module.exports = {
    gameReducer,
    getAddPlayerAction,
    getRemovePlayerAction
};
