// @ts-check

import { beginDiffieHellman, reconstructDiffieHellman } from './dh.js';
// @ts-ignore
import { desEncrypt, desDecrypt, decimalToBinaryString } from './crypto.js';
import WebSocket from 'isomorphic-ws';

const store = require("store");
const KEY_LENGTH = 256;

/**
 * Request a chat session to be initiated with the vendor user with the specified id.
 *  
 * @param {string} vendor 
 */
// @ts-ignore
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
 * @param {(ws: WebSocket) => void} readyCallback
 */
const handleHandshake = function(ws, msg, readyCallback) {
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
        readyCallback(ws);
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
 * @param {boolean} encrypted
 * @param {string} payload
 * @param {(ws: WebSocket, plain: string) => void} clb 
 */
const handleMessage = function(ws, encrypted, payload, clb) {
    const sharedKey = store.get('shared');
    const plain = encrypted ? desDecrypt(payload, sharedKey) : payload;
    clb(ws, plain);
}

/**
 * Wrap and encrypt plain text message with the shared key previously established with a DH exchange.
 * 
 * @param {WebSocket} ws 
 * @param {string} plain
 */
const sendMessageWrapper = function(ws, plain, encrypt = true) {
    const sharedKey = store.get('shared');
    ws.send(JSON.stringify({
        "type": "message",
        "message": encrypt ? desEncrypt(plain, sharedKey) : plain
    }));
}

/**
 * Open a WebSocket chat session identified by chatId ( previously requested with 
 * @see requestChat(vendor) ), calling the provided callbacks on successful chat instantiation,
 * when a message is received and after the socket is closed.
 * 
 * @param {string} chatId
 * @param {boolean} encrypt
 * @param {(this: WebSocket) => void} onOpen 
 * @param {(ws: WebSocket) => void} onReady 
 * @param {(ws: WebSocket, plain: string) => void} onMessage 
 * @param {(this: WebSocket) => void} onClose
 * @param {(this: WebSocket) => void} onError
 * @returns {[(plain: string) => void, () => void]} array of callbacks containing a callback for sending @see sendMessageWrapper and a wrapper for closing the socket
 */
const openChatSession = function(chatId, encrypt, onOpen, onReady, onMessage, onClose, onError) {
    const ws = new WebSocket(`ws://localhost:8080/chat/${chatId}`);
    const onPayloadAvailable = (data) => {
        const payload = JSON.parse(data.toString());
        console.log(payload);
        switch (payload.type) {
            case "message":
                handleMessage(ws, encrypt, payload.message, onMessage);
                break;
            case "handshake":
                handleHandshake(ws, payload, onReady);
                break;
            case "welcome":
                handleWelcome(ws, payload);
                break;
            case "ready":
                onReady(ws);
                break;
            case "close":
                ws.close();
                store.remove('shared');
                break;
        }
    };
    
    ws.onopen = onOpen;
    ws.onmessage = (evt) => {
        // @ts-ignore
        if (evt.data instanceof Blob) {
            evt.data.text().then(data => onPayloadAvailable(data));
        } else {
            onPayloadAvailable(evt.data);
        }
    };
    ws.onclose = onClose;
    ws.onerror = onError;
    return [(text) => sendMessageWrapper(ws, text, encrypt), () => ws.close()];
};

const _openChatSession = openChatSession;
export { _openChatSession as openChatSession };