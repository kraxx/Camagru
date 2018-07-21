export default (state = {}, action) => {
  switch (action.type) {

    case 'ALERT_SUCCESS':
      return {
        type: 'alertSuccess',
        message: action.message
      };

    case 'ALERT_ERROR':
      return {
        type: 'alertDanger',
        message: action.message
      };

    case 'ALERT_CLEAR':
      return {};
      
    default:
      return state;
  }
}