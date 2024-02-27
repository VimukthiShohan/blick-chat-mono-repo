import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  onClick,
  children,
  ...rest
}) => {
  return (
    <Button onClick={onClick} disabled={loading} {...rest}>
      {loading ? <CircularProgress size={24} /> : children}
    </Button>
  );
};

export default LoadingButton;
