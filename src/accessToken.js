let accessToken = "";

export const setAccessToken = s => {
  accessToken = s;
};

export const getAccessToken = () => {
  console.log("accesstoken:" + accessToken);
  return accessToken;
};
