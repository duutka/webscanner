/*** NPM  ***/
import { Dispatch } from "redux";
import { AxiosError } from "axios";

/*** REDUCER ***/
import { ScannerFetchAction, ScannerFetchActionTypes } from "./scannerReducer";

/*** MODELS ***/
import { IScanner } from "./../../models/scanner";

/*** OTHER ***/
import apiClient from "../../utils/api";

type ErrorResponse = {
  error: string;
};

export const postScanner = (scanner: IScanner) => {
  return async (dispatch: Dispatch<ScannerFetchAction>) => {
    try {
      dispatch({ type: ScannerFetchActionTypes.FETCH_SCANNER });

      const data = new FormData();

      data.append("url", scanner.url);

      await apiClient
        .post<IScanner>("/scanner/", data)
        .then((response) => {
          dispatch({
            type: ScannerFetchActionTypes.FETCH_SCANNER_SUCCESS,
            payload: response.data,
          });
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            dispatch({
              type: ScannerFetchActionTypes.FETCH_SCANNER_ERROR,
              payload: (error.response.data as ErrorResponse).error,
            });
          } else {
            dispatch({
              type: ScannerFetchActionTypes.FETCH_SCANNER_ERROR,
              payload:
                "Произошла неопознанная ошибка при сканировании. Попробуйте еще раз.",
            });
          }
        });
    } catch (error) {
      dispatch({
        type: ScannerFetchActionTypes.FETCH_SCANNER_ERROR,
        payload:
          "Произошла неопознанная ошибка при сканировании. Попробуйте еще раз.",
      });
    }
  };
};
