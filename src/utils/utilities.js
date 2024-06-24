export const getAccessToken = () => {
  const token = sessionStorage.getItem("accessToken");
  return token ? JSON.parse(token) : null;
};
