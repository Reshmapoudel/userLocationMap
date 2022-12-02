import { combineReducers } from "redux";
import location, { initialState as locationState } from "./location";

export const initialState = {
  location: locationState,
};

export default combineReducers({
  location,
});
