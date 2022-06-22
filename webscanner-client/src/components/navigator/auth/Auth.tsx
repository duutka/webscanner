/*** NPM ***/
import React from "react";

/*** MODELS ***/
import { IAuth } from "../../../models/scanner";

/*** STYLE ***/
import "./Auth.css";

interface IProps {
  auth: IAuth;
}

const Auth = (props: IProps): JSX.Element => {
  return (
    <div className="auth-card">
      {props.auth.authFinder ? (
        <>
          <div className="auth-card_header">
            <span className="auth-card_header-text">
              Формы авторизации {props.auth.authFinder}
            </span>
            <span className="auth-card_header-value">
              {props.auth.authBrute}
            </span>
          </div>
        </>
      ) : (
        <>Авторизация на сервере не найдена</>
      )}
    </div>
  );
};

export default Auth;
