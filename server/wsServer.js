#!/usr/bin/env node

const { werewolfProtocol } = require('../constants');
const { serialize } = require('../serialization/game');

const allConnections = new Set();

const game = { // TODO: make game immutable?
    players: [],
};

const WebSocketServer = require('websocket').server;

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
};

const sendUpdate = (playersOnly = false) => {
    const connections = playersOnly ?
        game.players.map((player) => player.connection)
        : allConnections.keys();

    // send update to every player
    for (let connection of connections) {
        connection.send(serialize(game));
    }
};

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
            console.log('registered player: ' + message.utf8Data);

            game.players.push({
                name: message.utf8Data,
                connection,
            });

            allConnections.add(connection);

            sendUpdate();
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        const index = game.players.findIndex((player) => player.connection === connection);

        if (index !== -1) {
            game.players.splice(index, 1);
        }

        allConnections.delete(connection);
        sendUpdate();
    });

    connection.send(serialize(game));
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
