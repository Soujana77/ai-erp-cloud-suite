// utils/tokenStore.js

let refreshTokens = [];

const addRefreshToken = (token) => {
  refreshTokens.push(token);
};

const removeRefreshToken = (token) => {
  refreshTokens = refreshTokens.filter((t) => t !== token);
};

const isValidRefreshToken = (token) => {
  return refreshTokens.includes(token);
};

module.exports = {
  addRefreshToken,
  removeRefreshToken,
  isValidRefreshToken,
};