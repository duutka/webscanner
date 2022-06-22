/*** NPM ***/
import { Dispatch } from "redux";

/*** REDUCER ***/
import {
  NavigatorAction,
  NavigatorActionTypes,
  NavigatorLocation,
} from "./navigatorReducer";

export const changeLocation = (location: NavigatorLocation) => {
  return async (dispatch: Dispatch<NavigatorAction>) => {
    dispatch({
      type: NavigatorActionTypes.CHANGE_NAVIGATION,
      payload: location,
    });
  };
};
