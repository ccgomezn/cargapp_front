import actions from "./actions";

const initState = { idToken: null, roles: null };

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token,
        roles: action.roles
      };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
