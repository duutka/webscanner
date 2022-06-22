/*** MODELS ***/
import { IScanner } from "../../models/scanner";

export interface ScannerFetchState {
  scanner: IScanner | null;
  isLoading: boolean;
  isReport: boolean;
  error: string | null;
}

export enum ScannerFetchActionTypes {
  FETCH_SCANNER = "FETCH_SCANNER",
  FETCH_SCANNER_SUCCESS = "FETCH_SCANNER_SUCCESS",
  FETCH_SCANNER_ERROR = "FETCH_SCANNER_ERROR",
}

interface FetchScannerAction {
  type: ScannerFetchActionTypes.FETCH_SCANNER;
}

interface FetchScannerSuccessAction {
  type: ScannerFetchActionTypes.FETCH_SCANNER_SUCCESS;
  payload: IScanner;
}

interface FetchScannerErrorAction {
  type: ScannerFetchActionTypes.FETCH_SCANNER_ERROR;
  payload: string;
}

export type ScannerFetchAction =
  | FetchScannerAction
  | FetchScannerSuccessAction
  | FetchScannerErrorAction;

const initialState: ScannerFetchState = {
  scanner: null,
  isLoading: false,
  isReport: false,
  error: null,
};

export const scannerReducer = (
  state = initialState,
  action: ScannerFetchAction
): ScannerFetchState => {
  switch (action.type) {
    case ScannerFetchActionTypes.FETCH_SCANNER:
      return { isLoading: true, error: null, isReport: false, scanner: null };
    case ScannerFetchActionTypes.FETCH_SCANNER_SUCCESS:
      return {
        isLoading: false,
        isReport: true,
        error: null,
        scanner: action.payload,
      };
    case ScannerFetchActionTypes.FETCH_SCANNER_ERROR:
      return {
        isLoading: false,
        isReport: false,
        error: action.payload,
        scanner: null,
      };
    default:
      return state;
  }
};
