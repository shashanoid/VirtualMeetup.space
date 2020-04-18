export default (state = {}, action) => {
    switch (action.type) {
      case "TEST_ACTION":
        return {
          ...state,
          test: action.payload
        };
      default:
        return state;
    }
  };
  