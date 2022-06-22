/*** NPM ***/
import React from "react";

/*** STYLE ***/
import "./Robots.css";

interface IProps {
  robots: boolean;
}

const Robots = (props: IProps): JSX.Element => {
  return (
    <div className="robots-card">
      <span className="robots-card_text">Проверка наличия robots</span>
      {props.robots ? (
        <div className="robots-card_value">
          <span></span>
        </div>
      ) : (
        <div className="robots-card_value">
          <span className="robots-card_value-text">
            Robots.txt не обнаружен!
          </span>
        </div>
      )}
    </div>
  );
};

export default Robots;
