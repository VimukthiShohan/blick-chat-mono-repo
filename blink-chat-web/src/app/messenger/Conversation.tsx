import React from 'react';
import {
  Paper,
  Typography,
  Avatar,
  IconButton,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

import { Nullable } from '@/api/apiService';
import { ConversationResponse } from '@/types/conversation.types';

interface ConversationProps {
  selectedConversation: Nullable<ConversationResponse>;
  closeConversation: (p: null) => void;
}

const Conversation: React.FC<ConversationProps> = ({
  selectedConversation,
  closeConversation,
}) => {
  const messages = [
    { text: 'Hello!', isUser: false },
    { text: 'Hi there!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    { text: 'How are you?', isUser: false },
    { text: 'I am good, thanks!', isUser: true },
    // Add more messages as needed
  ];

  return (
    <Paper variant="outlined" className="h-screen flex flex-col">
      {selectedConversation ? (
        <>
          <div className="flex m-2 justify-between">
            <div className="flex flex-row">
              <Avatar
                src={selectedConversation.profilePic}
                alt={selectedConversation.userName}
                className="mt-1"
              />
              <div className="flex flex-col ml-2">
                <Typography variant="h5">
                  {selectedConversation.userName}
                </Typography>
                <Typography variant="caption">
                  {true ? 'Online' : 'Offline'}
                </Typography>
              </div>
            </div>
            <IconButton onClick={() => closeConversation(null)}>
              <CloseIcon fontSize={'medium'} />
            </IconButton>
          </div>

          <div
            className="flex flex-col flex-grow overflow-y-auto p-4"
            style={{
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column-reverse',
            }}
          >
            {messages
              .slice(0)
              .reverse()
              .map((msg, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  className={clsx(
                    'p-2 m-2 max-w-[100%]',
                    msg.isUser
                      ? 'bg-blue-500 text-white text-right'
                      : 'bg-gray-200 text-left',
                  )}
                >
                  {msg.text}
                </Paper>
              ))}
          </div>

          <div
            className="p-4 items-end flex flex-row"
            style={{ flexShrink: 0 }}
          >
            <div className="w-11/12">
              <TextField
                variant="outlined"
                fullWidth
                label="Type your message"
              />
            </div>
            <div className="w-1/12 flex justify-center pb-2">
              <IconButton>
                <SendIcon className="text-blue-500" fontSize={'large'} />
              </IconButton>
            </div>
          </div>
        </>
      ) : null}
    </Paper>
  );
};

export default Conversation;
