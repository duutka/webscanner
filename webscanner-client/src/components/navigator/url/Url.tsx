/*** NPM ***/
import React from "react";

/*** MODELS ***/
import { IUrlStatus } from "../../../models/scanner";

/*** ICONS ***/
import DoneIcon from "@mui/icons-material/Done";
import ErrorIcon from "@mui/icons-material/Error";

/*** STYLE ***/
import "./Url.css";

interface IProps {
  urls: IUrlStatus[];
}

const Url = (props: IProps): JSX.Element => {
  const countCorrectUrl = (): number => {
    let sum = 0;

    props.urls.forEach((url) => {
      if (url.status === "200") {
        sum++;
      }
    });

    return Math.round((sum / props.urls.length) * 100);
  };

  const countTitleTag = (): number => {
    let sum = 0;

    props.urls.forEach((url) => {
      if (url.title) {
        sum++;
      }
    });

    return Math.round(sum / props.urls.length) * 100;
  };

  const countDescriptionTag = (): number => {
    let sum = 0;

    props.urls.forEach((url) => {
      if (url.description) {
        sum++;
      }
    });

    return Math.round((sum / props.urls.length) * 100);
  };

  const countKeywordsTag = (): number => {
    let sum = 0;

    props.urls.forEach((url) => {
      if (url.keywords) {
        sum++;
      }
    });

    return Math.round((sum / props.urls.length) * 100);
  };

  return (
    <>
      <div className="url-card">
        <div className="url-card_header">
          <span className="url-card_header-text">
            Количество коректных ссылок
          </span>
          <span className="url-card_header-value">{countCorrectUrl()} %</span>
        </div>
        <div className="url-card_body">
          <span className="url-card_body-text">Список некоректных ссылок</span>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {props.urls.map((url, idx) => {
                if (url.status !== "200") {
                  return (
                    <tr key={idx}>
                      <td>{url.url}</td>
                      <td>{url.status}</td>
                    </tr>
                  );
                } else {
                  return <></>;
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="url-card_body">
          <span className="url-card_body-text">Наличие необходимых тегов</span>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Тег "title" {countTitleTag()} %</th>
                <th>Тег "meta description" {countDescriptionTag()} %</th>
                <th>Тег "meta keywords" {countKeywordsTag()} %</th>
              </tr>
            </thead>
            <tbody>
              {props.urls.map((url, idx) => {
                if (url.status === "200") {
                  return (
                    <tr key={idx}>
                      <td>{url.url}</td>
                      <td>{url.title ? <DoneIcon /> : <ErrorIcon />}</td>
                      <td>{url.description ? <DoneIcon /> : <ErrorIcon />}</td>
                      <td>{url.keywords ? <DoneIcon /> : <ErrorIcon />}</td>
                    </tr>
                  );
                } else {
                  return <></>;
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Url;
