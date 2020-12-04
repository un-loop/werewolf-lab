import React from 'react';
import GameContext from './GameContext';

const GameContextProvider = ({children, game}) => {
    return (
        <GameContext.Provider value={game}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContextProvider;
