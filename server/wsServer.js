#!/usr/bin/env node

const { werewolfProtocol } = require('../constants');

const game = { // TODO: make game immutable?
    players: new Map() // map connections to player data
};

const WebSocketServer = require('websocket').server;

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

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
            game.players.set(connection, message.utf8Data);
            console.table(game.players.values());
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        game.players.delete(connection);
    });
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
