export default (state = {}, action) => {
    switch (action.type) {
      case "USER_INFO":
        return {
          ...state,
          user: action.payload
        };
      default:
        return state;
    }
  };
  