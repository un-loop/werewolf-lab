import { SIGNUP } from "../../enums/gameStatus";

const minPlayers = 7;
const maxPlayers = 50;
const ADD_PLAYER = "game/addPlayer";
const REMOVE_PLAYER = "game/removePlayer";

const initialState = {
    players: [],
    gameStatus: SIGNUP,

};


const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
            return {
                ...state,
                players: [...state.players, action.payload]
            };
        case REMOVE_PLAYER:
            return {
                ...state,
                players: state.players.filter((player) => {
                    return player.connection !== action.payload.connection;
                })
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

export default gameReducer;