/*** NPM ***/
import React from "react";

/*** MODELS ***/
import { IHttpenum } from "../../../models/scanner";

/*** STYLE ***/
import "./File.css";

interface IProps {
  httpenum: IHttpenum[];
}

const File = (props: IProps): JSX.Element => {
  return (
    <>
      <div className="file-card">
        <div className="file-card_header">
          <span className="file-card_header-text">Конфигурации сервера </span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Имя хостинга</th>
              <th>Продукт</th>
              <th>Операционная система</th>
              <th>Версия</th>
              <th>Дополнительная информация</th>
            </tr>
          </thead>
          <tbody>
            {props.httpenum.map((httpenum, idx) => {
              return (
                <tr key={idx}>
                  <td>{httpenum.hostname}</td>
                  <td>{httpenum.product}</td>
                  <td>{httpenum.ostype}</td>
                  <td>{httpenum.version}</td>
                  <td>{httpenum.extrainfo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="file-card_header">
          {props.httpenum.map((httpenum) => {
            return (
              <>
                {httpenum.httpenum ? (
                  <div>
                    Скрытых файлов не найдено в конфигурации {httpenum.product}
                  </div>
                ) : (
                  <div>{httpenum.httpenum}</div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default File;
