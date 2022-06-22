export enum NavigatorLocation {
  VIEW = "VIEW",
  URL = "URL",
  SITEMAP = "SITEMAP",
  ROBOTS = "ROBOTS",
  INJECTION = "INJECTION",
  HOST = "HOST",
  BRUTEFORCE = "BRUTEFORCE",
  AUTH = "AUTH",
  FILE = "FILE",
}

export interface NavigatorState {
  location: NavigatorLocation | null;
}

export enum NavigatorActionTypes {
  CHANGE_NAVIGATION = "CHANGE_NAVIGATION",
}

interface NavigatorChangeNavigationAction {
  type: NavigatorActionTypes.CHANGE_NAVIGATION;
  payload: NavigatorLocation;
}

export type NavigatorAction = NavigatorChangeNavigationAction;

const initialState: NavigatorState = {
  location: null,
};

export const navigatorReducer = (
  state = initialState,
  action: NavigatorAction
): NavigatorState => {
  switch (action.type) {
    case NavigatorActionTypes.CHANGE_NAVIGATION:
      return {
        location: action.payload,
      };
    default:
      return state;
  }
};
