export default (state = {}, action) => {
  switch (action.type) {

    case 'POST_GETALL_REQUEST':
      return {
        loading: true
      };

    case 'POST_GETALL_SUCCESS':
      return {
        items: action.posts
      };

    case 'POST_GETALL_FAILURE':
      return {
        error: action.error
      };

    case 'POST_ADD_REQUEST':
      return {
        ...state,
        adding: true
      };

    case 'POST_ADD_SUCCESS':
      if (state.items) {
        return {
          items: [...state.items, action.post]
        };        
      }
      return {
        items: [action.post]
      };

    case 'POST_ADD_FAILURE':
      return {
        ...state,
        error: action.error
      }

    case 'POST_UPDATE_REQUEST':
      return {
        ...state,
        updating: true
      }

    case 'POST_UPDATE_SUCCESS':
      let index;
      for (let key in state.items) {
        if (state.items[key].id === action.post.id) {
          index = key;
        }
      }
      return {
        items: [
          ...state.items.slice(0, index),
          action.post,
          ...state.items.slice(parseInt(index) + 1)
        ]
      };

    case 'POST_DELETE_REQUEST':
      return {
        ...state,
        items: state.items.map(post =>
          post.id === action.id
          ? { ...post, deleting: true }
          : post
        )
      };

    case 'POST_DELETE_SUCCESS':
      return {
        items: state.items.filter(post => post.id !== action.id)
      };

    case 'POST_DELETE_FAILURE':
      return {
        ...state,
        items: state.items.map(post => {
          if (post.id === action.id) {
            const { deleting, ...postCopy } = post;
            return { ...postCopy, deleteError: action.error };            
          }
          return post;
        })
      };

    default:
      return state;
  }
}