const BLINK_CHAT_API = 'http://localhost:3001/';

const SOCKET_EVENTS = {
  NEW_CONVERSATION: 'newConversation',
  CONVERSATION_MESSAGE: 'conversationMessage',
  JOIN_ROOM: 'joinRoom',
  LEAVE_ROOM: 'leaveRoom',
};

export { BLINK_CHAT_API, SOCKET_EVENTS };
