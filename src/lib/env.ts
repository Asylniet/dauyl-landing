export const env = () => {
  const VITE_APP_URL = import.meta.env.VITE_APP_URL;
  
  if (!VITE_APP_URL) {
    throw new Error('VITE_APP_URL is missing in environment variables');
  }
  
  return { VITE_APP_URL };
};