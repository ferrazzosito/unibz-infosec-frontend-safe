const {openChatSession} = require('./src/util/chat');

const chatid = "9d3d63b8-7f93-4d77-af2e-6010c53b47c8";
const onMessage = (ws, msg) => console.log("message: " + msg);
const onOpen = () => console.log("opened");
const onClose = () => console.log("closed");
const onError = (error) => console.log("error: " + error);

const [sendMessage, closeSession] = openChatSession(chatid, onOpen, onMessage, onClose, onError);

exports.sendMessage = sendMessage;
exports.closeSession = closeSession;