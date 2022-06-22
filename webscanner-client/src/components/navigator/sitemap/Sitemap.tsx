/*** NPM ***/
import React from "react";

/*** STYLE ***/
import "./Sitemap.css";

interface IProps {
  sitemap: boolean;
}

const Sitemap = (props: IProps): JSX.Element => {
  return (
    <div className="sitemap-card">
      <span className="sitemap-card_text">Проверка наличия sitemap</span>
      {props.sitemap ? (
        <div className="sitemap-card_value">
          <span></span>
        </div>
      ) : (
        <div className="sitemap-card_value">
          <span className="sitemap-card_value-text">
            Sitemap.xml не обнаружен!
          </span>
        </div>
      )}
    </div>
  );
};

export default Sitemap;
