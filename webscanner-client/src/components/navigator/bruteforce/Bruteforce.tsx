/*** NPM ***/
import React from "react";
import { IBruteForce } from "../../../models/scanner";

/*** STYLE ***/
import "./Bruteforce.css";

interface IProps {
  bruteForce: IBruteForce;
}

const Bruteforce = (props: IProps): JSX.Element => {
  return (
    <div className="bruteforce-card">
      <div className="bruteforce-card_header">
        <span className="bruteforce-card_header-text">
          Результаты подбора паролей
        </span>
        <div className="bruteforce-card_header-value">
          {props.bruteForce.ssh !== "{}" ? (
            <div>{props.bruteForce.ssh}</div>
          ) : (
            <div>Подбор паролей сервиса ssh результатов не принес</div>
          )}
          {props.bruteForce.ftp !== "{}" ? (
            <div>{props.bruteForce.ftp}</div>
          ) : (
            <div>Подбор паролей сервиса ftp результатов не принес</div>
          )}
          {props.bruteForce.mysqlempty !== "{}" ? (
            <div>{props.bruteForce.mysql}</div>
          ) : (
            <div>Пароли для анонимных и root пользователей защищены</div>
          )}
          {props.bruteForce.mysql !== "{}" ? (
            <div>{props.bruteForce.mysql}</div>
          ) : (
            <div>Подбор паролей сервиса mysql результатов не принес</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bruteforce;
