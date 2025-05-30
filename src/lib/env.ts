export const env = () => {
  const VITE_APP_URL = import.meta.env.VITE_APP_URL;
  const VITE_SUPPORT_NUMBER = import.meta.env.VITE_SUPPORT_NUMBER;
  
  if (!VITE_APP_URL) {
    throw new Error('VITE_APP_URL is missing in environment variables');
  }
  
  if (!VITE_SUPPORT_NUMBER) {
    throw new Error('VITE_SUPPORT_NUMBER is missing in environment variables');
  }
  
  return { VITE_APP_URL, VITE_SUPPORT_NUMBER };
};