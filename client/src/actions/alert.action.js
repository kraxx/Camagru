const success = (message) => {
  return {
    type: 'ALERT_SUCCESS',
    message
  };
}

const error = (message) => {
  return {
    type: 'ALERT_ERROR',
    message
  };
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