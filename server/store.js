// connections
const connections = [];
function saveConnection(websocket, username, channel){
    connections.push(
        {websocket, username, channel}
    );
}

// messages
let getMsg = (channel) => 
    [
        { date: "12:23 1.2.2019", username: 'kari', text: 'kova ääni' },
        { date: "12:23 1.2.2019", username: 'jari', text: 'kari' }
    ];

// module exports
exports.defaultChannel = 'lobby';
exports.saveConnection = saveConnection;
exports.getConnections = connections;
exports.getMsg = getMsg;