import React from 'react';
import { Paper, Typography, Avatar } from '@mui/material';

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
      <Avatar src={profilePic} alt={profileName} />
      <Typography variant="h5">{profileName}</Typography>
      <Typography variant="subtitle1">
        {online ? 'Online' : 'Offline'}
      </Typography>
      {/* Add conversation content here */}
    </Paper>
  );
};

export default Conversation;
