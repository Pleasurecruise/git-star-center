// local dev
export const API_BASE_URL = 'http://localhost:8080';
export const OAUTH2_REDIRECT_URI = 'http://localhost:5173/oauth2/redirect'
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
// // production dev
// export const API_BASE_URL = 'https://backend.gitstar.center';
// export const OAUTH2_REDIRECT_URI = 'https://gitstar.center/oauth2/redirect'
// export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
