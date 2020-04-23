
export const changeUserData=(val)=> {
  return dispatch => {
    dispatch({ type: "userdata", payload: val })
  }
}
