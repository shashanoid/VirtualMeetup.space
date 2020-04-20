import { combineReducers } from "redux";
import testReducer from "./testReducer";
import roomInfoReducer from './roomInfoReducer';
import userInfoReducer from './userInfoReducer'


export default combineReducers({
    userInfo: userInfoReducer,
    test: testReducer,
    room: roomInfoReducer
});
