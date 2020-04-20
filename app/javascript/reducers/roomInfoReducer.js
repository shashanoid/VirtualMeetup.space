export default (state = {}, action) => {
    switch (action.type) {
      case "ROOM_INFO":
        return {
          ...state,
          roomInfo: action.payload
        };
      default:
        return state;
    }
  };
  