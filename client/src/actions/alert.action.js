const clearAfterDelay = (dispatch) => {
  return setTimeout(() => {
    dispatch({ type: 'ALERT_CLEAR' });
  }, 5000);
}

const success = (message) => {
  return (dispatch) => {
    dispatch({
      type: 'ALERT_SUCCESS',
      message
    });
    return clearAfterDelay(dispatch);
  }
}

const error = (message) => {
  return (dispatch) => {
    dispatch({
      type: 'ALERT_ERROR',
      message
    });
    return clearAfterDelay(dispatch);
  }
}

const clear = () => {
  return {
    type: 'ALERT_CLEAR'
  };
}

export const alertActions = {
    success,
    error,
    clear
};