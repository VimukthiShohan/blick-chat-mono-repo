import { useSnackbar } from 'notistack';
import { ApiServiceErr, getApiError } from '@/api/apiService';

const SUCCESS = 'success';
const ERROR = 'error';

export const useSnack = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSuccessSnack = (msg: string) =>
    enqueueSnackbar(msg, {
      variant: SUCCESS,
    });

  const showErrSnack = (err: ApiServiceErr | string) =>
    enqueueSnackbar(getApiError(err), { variant: ERROR });

  return { showSuccessSnack, showErrSnack };
};
