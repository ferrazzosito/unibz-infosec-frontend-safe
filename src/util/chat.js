// @ts-check

const { beginDiffieHellman, reconstructDiffieHellman } = require('./dh.js');
const { desEncrypt, desDecrypt, decimalToBinaryString } = require('./crypto.js');
const store = require('store');
const { WebSocket } = require('ws');

const KEY_LENGTH = 1024;

/**
 * Request a chat session to be initiated with the vendor user with the specified id.
 *  
 * @param {string} vendor 
 */
const requestChat = async function(vendor) {
    return await fetch("http://localhost:8080/v1/chats/request", {
        method: 'POST',
        body: JSON.stringify({
            vendorId: vendor,
            customerId: 1
        })
    });
};

/**
 * Begin the DH handshake, after being informed by the server that another recipient is already subscribed to the chat.
 * 
 * @param {WebSocket} ws 
 */
const beginHandshake = function(ws) {
    const dh = beginDiffieHellman("alice", KEY_LENGTH);
    store.set('dh', {
        pub: dh.getPublicKey('hex'),
        priv: dh.getPrivateKey('hex'),
        keyLength: KEY_LENGTH,
        g: dh.getGenerator('hex'),
        n: dh.getPrime('hex'),
    });
    ws.send(JSON.stringify({
        type: "handshake",
        role: "alice",
        keyLength: KEY_LENGTH,
        g: dh.getGenerator('hex'),
        n: dh.getPrime('hex'),
        pub: dh.getPublicKey('hex')
    }));
};

/**
 * Handle a DH handshake initiated by the other side.
 * 
 * @param {WebSocket} ws 
 * @param {object} msg 
 */
const handleHandshake = function(ws, msg) {
    const { role } = msg;
    if (role === "alice") {
        const {g, n, pub: otherPub} = {
            g: Buffer.from(msg.g, 'hex'),
            n: Buffer.from(msg.n, 'hex'),
            pub: Buffer.from(msg.pub, 'hex')
        };
        const dh = beginDiffieHellman("bob", msg.keyLength, n, g);
        const sharedKey = dh.computeSecret(otherPub);
        store.set('shared', sharedKey.toString('hex'));
        ws.send(JSON.stringify({
            type: "handshake",
            role: "bob",
            keyLength: msg.keyLength,
            pub: dh.getPublicKey('hex'),
        }));
    } else if (role === "bob") {
        const { pub: otherPub } = msg;
        const { pub, priv, n, g } = store.get('dh');
        const dh = reconstructDiffieHellman(
            Buffer.from(pub, 'hex'), 
            Buffer.from(priv, 'hex'), 
            Buffer.from(n, 'hex'), 
            Buffer.from(g, 'hex')
        );
        const sharedKey = dh.computeSecret(Buffer.from(otherPub, 'hex'));
        store.remove('dh');
        store.set('shared', sharedKey.toString('hex'));
        ws.send(JSON.stringify({
            "type": "ready"
        }));
    }
}

/**
 * Handle welcome message, sent by the ws broker server after a connection to it is established.
 * 
 * @param {WebSocket} ws
 * @param {object} msg 
 */
const handleWelcome = function(ws, msg) {
    if (msg.subscribers == 1) {
        beginHandshake(ws);
    }
};

/**
 * Unwrap and decrypt message, invoke message callback.
 *  
 * @param {WebSocket} ws 
 * @param {string} enc
 * @param {(ws: WebSocket, plain: string) => void} clb 
 */
const handleMessage = function(ws, enc, clb) {
    const sharedKey = store.get('shared');
    console.log("decrypting with key " + sharedKey);
    const plain = desDecrypt(enc, sharedKey);
    clb(ws, plain);
}

/**
 * Wrap and encrypt plain text message with the shared key previously established with a DH exchange.
 * 
 * @param {WebSocket} ws 
 * @param {string} plain
 */
const sendMessageWrapper = function(ws, plain) {
    const sharedKey = store.get('shared');
    console.log("encrypting with key " + sharedKey);
    ws.send(JSON.stringify({
        "type": "message",
        "message": desEncrypt(plain, sharedKey)
    }));
}

/**
 * Open a WebSocket chat session identified by chatId ( previously requested with 
 * @see requestChat(vendor) ), calling the provided callbacks on successful chat instantiation,
 * when a message is received and after the socket is closed.
 * 
 * @param {string} chatId
 * @param {(this: WebSocket) => void} onOpen 
 * @param {(ws: WebSocket, plain: string) => void} onMessage 
 * @param {(this: WebSocket) => void} onClose
 * @param {(this: WebSocket) => void} onError
 * @returns {[(plain: string) => void, () => void]} array of callbacks containing a callback for sending @see sendMessageWrapper and a wrapper for closing the socket
 */
const openChatSession = function(chatId, onOpen, onMessage, onClose, onError) {
    const ws = new WebSocket(`ws://localhost:8080/chat/${chatId}`);
    ws.on('open', onOpen);
    ws.on('message', (data) => {
        const payload = JSON.parse(data.toString('utf8'));
        switch (payload.type) {
            case "message":
                handleMessage(ws, payload.message, onMessage);
                break;
            case "handshake":
                handleHandshake(ws, payload);
                break;
            case "welcome":
                handleWelcome(ws, payload);
                break;
            case "ready":
                console.log("nice");
                break;
            case "close":
                ws.close();
                store.remove('shared');
                break;
        }
    });
    ws.on('close', onClose);
    ws.on('error', onError);
    return [(text) => sendMessageWrapper(ws, text), () => ws.close()];
};

exports.openChatSession = openChatSession;