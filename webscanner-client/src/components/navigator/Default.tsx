/*** NPM ***/
import React from "react";

/*** STYLE ***/
import "./Default.css";

interface IProps {
  title: string;
  child: JSX.Element;
}

const Default = (props: IProps) => {
  return (
    <>
      <div className="content-container">
        <div className="content_header">
          <span className="content_header-text">{props.title}</span>
        </div>
        <div className="content_body">{props.child}</div>
      </div>
    </>
  );
};

export default Default;
