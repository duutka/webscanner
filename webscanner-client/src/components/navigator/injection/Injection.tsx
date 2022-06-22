/*** NPM ***/
import React from "react";
import { IInjection } from "../../../models/scanner";

/*** ICONS ***/
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";

/*** STYLE ***/
import "./Injection.css";

interface IProps {
  injections: IInjection[];
}

const Injection = (props: IProps): JSX.Element => {
  const countInjection = (): number => {
    let sum = 0;

    props.injections.forEach((injection) => {
      if (injection.sql) {
        sum++;
      }
      if (injection.xss) {
        sum++;
      }
    });

    return Math.round((sum / props.injections.length) * 100);
  };

  return (
    <div className="injection-card">
      <div className="injection-card_header">
        <span className="injection-card_header-text">
          Количество уязвимостей
        </span>
        <span className="injection-card_header-value">
          {countInjection()} %
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>SQL-Injection</th>
            <th>XSS</th>
          </tr>
        </thead>
        <tbody>
          {props.injections.map((injection, idx) => {
            return (
              <tr key={idx}>
                <td>{injection.url}</td>
                <td>{!injection.sql ? <DoneIcon /> : <ErrorIcon />}</td>
                <td>{!injection.xss ? <DoneIcon /> : <ErrorIcon />}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Injection;
