let accessToken = "";

export const setAccessToken = s => {
  accessToken = s;
  console.log("SETTING accesstoken:" + accessToken);
};

export const getAccessToken = () => {
  console.log("accesstoken:" + accessToken);
  return accessToken;
};
