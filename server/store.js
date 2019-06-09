// connections
const connections = [];
function saveConnection(websocket, username, channel){
    connections.push(
        {websocket, username, channel}
    );
}

// messages
const messages = [
    { channel: 'lobby', date: "12:23 1.2.2019", username: 'kari', text: 'kova ääni' },
    { channel: 'lobby', date: "12:23 1.2.2019", username: 'jari', text: 'kari' }
];

let getMessages = (channel) => {
    return messages.filter(msg => msg.channel === channel);
}

function saveMessage(msg){
    messages.push(msg);    
}

// module exports
exports.defaultChannel = 'lobby';
exports.saveConnection = saveConnection;
exports.getConnections = connections;
exports.getMessages = getMessages;
exports.saveMessage = saveMessage;