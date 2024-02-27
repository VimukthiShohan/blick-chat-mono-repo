const TOKEN = 'token';

export const getTokenInLocal = () => localStorage.getItem(TOKEN);

export const saveTokenInLocal = (userToken: string) =>
  localStorage.setItem(TOKEN, userToken);
