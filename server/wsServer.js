#!/usr/bin/env node

const { createStore } = require('redux');

const { werewolfProtocol } = require('../constants');
const { serialize } = require('../serialization/game');
const { gameReducer, getAddPlayerAction, getRemovePlayerAction, getStartAction } = require('./reducers/gameReducer');

const allConnections = new Set();

const store = createStore(gameReducer);

const WebSocketServer = require('websocket').server;

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
};

const sendUpdate = (playersOnly = false) => () => {
    const game = store.getState();

    const connections = playersOnly ?
        game.players.map((player) => player.connection)
        : allConnections.keys();

    // send update to every player
    for (let connection of connections) {
        connection.send(serialize(game));
    }
};

store.subscribe(sendUpdate(false));

const handleConnection = (request) => {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }

    const connection = request.accept(werewolfProtocol, request.origin);

    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            const data = JSON.parse(message.utf8Data);
            switch(data.type) {
                case "join": {
                    allConnections.add(connection);
                    store.dispatch(getAddPlayerAction(data.payload, connection));
                    break;
                }
                case "start": {
                    store.dispatch(getStartAction());
                    break;
                }
            }
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');

        allConnections.delete(connection);
        store.dispatch(getRemovePlayerAction(connection));
    });

    connection.send(serialize(store.getState()));
}

module.exports = (httpServer) => {
    wsServer = new WebSocketServer({
        httpServer,
        // You should not use autoAcceptConnections for production
        // applications, as it defeats all standard cross-origin protection
        // facilities built into the protocol and the browser.  You should
        // *always* verify the connection's origin and decide whether or not
        // to accept it.
        autoAcceptConnections: false
    });

    wsServer.on('request', handleConnection);

    return wsServer;
}
