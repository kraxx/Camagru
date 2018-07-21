export default (state = {}, action) => {
  switch (action.type) {

    case 'USER_GETALL_REQUEST':
      return {
        loading: true
      };

    case 'USER_GETALL_SUCCESS':
      return {
        items: action.users
      };

    case 'USER_GETALL_FAILURE':
      return {
        error: action.error
      };

    case 'USER_ADD_REQUEST':
      return {
        ...state,
        adding: true
      };

    case 'USER_ADD_SUCCESS':
      if (!state.items) {
        return [ action.user ]
      }
      return {
        items: [ ...state.items, action.user ]
      };

    case 'USER_ADD_FAILURE':
      return {
        ...state,
        error: action.error
      }

    case 'USER_UPDATE_REQUEST':
      return {
        ...state,
        updating: true
      }

    case 'USER_UPDATE_SUCCESS':
      if (state.items) {
        let index;
        for (let key in state.items) {
          if (state.items[key].id === action.user.id) {
            index = key;
          }
        }
        return {
          items: [
            ...state.items.slice(0, index),
            action.user,
            ...state.items.slice(parseInt(index) + 1)
          ]
        }
      }
      return {
        items: [ action.user ]
      }

    case 'USER_UPDATE_FAILURE':
      return {
        ...state,
        error: action.error
      };

    case 'USER_DELETE_REQUEST':
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
          ? { ...user, deleting: true }
          : user
        )
      };

    case 'USER_DELETE_SUCCESS':
      return {
        items: state.items.filter(user => user.id !== action.id)
      };

    case 'USER_DELETE_FAILURE':
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            const { deleting, ...userCopy } = user;
            return { ...userCopy, deleteError: action.error };            
          }
          return user;
        })
      };

    default:
      return state;
  }
}
