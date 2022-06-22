import { bindActionCreators } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import * as ScannerActionCreators from "../app/scanner/scannerAction";
import * as NavigatorActionCreators from "../app/navigator/navigatorAction";

const ActionCreators = {
  ...ScannerActionCreators,
  ...NavigatorActionCreators,
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAction = () => {
  const dispatch = useDispatch<AppDispatch>();
  return bindActionCreators(ActionCreators, dispatch);
};
