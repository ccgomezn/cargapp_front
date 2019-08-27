const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  AUTH_ERROR: 'AUTH_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  login: (data, url, url_role) => ({
    type: actions.LOGIN_REQUEST,
    data: data,
    url: url,
    url_role: url_role
  }),
  logout: () => ({
    type: actions.LOGOUT
  })
};
export default actions;
