const { SIGNUP, PLAYING } = require("../../enums/gameStatus");

const ADD_PLAYER = "game/addPlayer";
const START_GAME = "game/startGame";
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
        case START_GAME:
            console.log('starting game');
            if (state.players.length < process.env.MIN_PLAYERS ||
                state.players.length > process.env.MAX_PLAYERS) {
                console.log('Cannot state, invalid number of players.');
                return state;
            }

            return {
                ...state,
                gameStatus: PLAYING
            }
        case REMOVE_PLAYER:
            const removeIndex = state.players.findIndex(
                (player) => player.connection === action.payload.connection
            );

            if (removeIndex === -1) {
                return state;
            }

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

const getStartAction = () => {
    return {
        type: START_GAME
    };
}

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
    getRemovePlayerAction,
    getStartAction,
};
