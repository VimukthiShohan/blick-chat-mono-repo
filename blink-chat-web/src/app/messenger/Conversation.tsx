import React from 'react';
import { Paper, Typography, Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ConversationProps {
  profilePic: string;
  profileName: string;
  online: boolean;
}

const Conversation: React.FC<ConversationProps> = ({
  profilePic,
  profileName,
  online,
}) => {
  return (
    <Paper variant="outlined">
      <div className="flex m-2 justify-between">
        <div className="flex flex-row">
          <Avatar src={profilePic} alt={profileName} className="mt-1" />
          <div className="flex flex-col ml-2">
            <Typography variant="h5">{profileName}</Typography>
            <Typography variant="caption">
              {online ? 'Online' : 'Offline'}
            </Typography>
          </div>
        </div>
        <IconButton>
          <CloseIcon fontSize={'medium'} />
        </IconButton>
      </div>
      {/* Add conversation content here */}
    </Paper>
  );
};

export default Conversation;
