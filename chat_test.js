const { openChatSession } = require('./src/util/chat');

const chatid = "65e79451-f92d-458a-911f-fb1b7d8ca391";
const onMessage = (ws, msg) => console.log("message: " + msg);
const onReady = (ws) => console.log("ready");
const onOpen = () => console.log("opened");
const onClose = () => console.log("closed");
const onError = (error) => console.log("error: " + error);

const [sendMessage, closeSession] = openChatSession(chatid, onOpen, onReady, onMessage, onClose, onError);

exports.sendMessage = sendMessage;
exports.closeSession = closeSession;