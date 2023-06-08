const { openChatSession } = require('./src/util/chat');

const chatid = "6a8f58f4-18a1-4cd7-b4ff-aec2bd213ae9";
const onMessage = (ws, msg) => console.log("message: " + msg);
const onReady = (ws) => console.log("ready");
const onOpen = () => console.log("opened");
const onClose = () => console.log("closed");
const onError = (error) => console.log("error: " + error);

const [sendMessage, closeSession] = openChatSession(chatid, onOpen, onReady, onMessage, onClose, onError);

exports.sendMessage = sendMessage;
exports.closeSession = closeSession;