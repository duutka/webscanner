/*** NPM ***/
import React from "react";
import { Button } from "@mui/material";

/*** MODELS ***/
import { IScanner } from "../../../models/scanner";

/*** HOOKS ***/
import { useAction } from "../../../app/hooks";

/*** STYLE ***/
import "./View.css";
import { NavigatorLocation } from "../../../app/navigator/navigatorReducer";

interface IProps {
  scanner: IScanner;
}

const View = (props: IProps): JSX.Element => {
  const { changeLocation } = useAction();

  const countCorrectUrl = (): number => {
    if (props.scanner.seo?.urls) {
      let sum = 0;

      props.scanner.seo?.urls.forEach((url) => {
        if (url.status === "200") {
          sum++;
        }
      });

      return Math.round((sum / props.scanner.seo?.urls.length) * 100);
    }

    return 0;
  };

  const countTitleTag = (): number => {
    if (props.scanner.seo?.urls) {
      let sum = 0;

      props.scanner.seo?.urls.forEach((url) => {
        if (url.title) {
          sum++;
        }
      });

      return Math.round(sum / props.scanner.seo?.urls.length) * 100;
    }

    return 0;
  };

  const countDescriptionTag = (): number => {
    if (props.scanner.seo?.urls) {
      let sum = 0;

      props.scanner.seo?.urls.forEach((url) => {
        if (url.description) {
          sum++;
        }
      });

      return Math.round((sum / props.scanner.seo?.urls.length) * 100);
    }

    return 0;
  };

  const countKeywordsTag = (): number => {
    if (props.scanner.seo?.urls) {
      let sum = 0;

      props.scanner.seo?.urls.forEach((url) => {
        if (url.keywords) {
          sum++;
        }
      });

      return Math.round((sum / props.scanner.seo?.urls.length) * 100);
    }

    return 0;
  };

  const countInjection = (): number => {
    let sum = 0;

    props.scanner.injections.forEach((injection) => {
      if (injection.sql) {
        sum++;
      }
      if (injection.xss) {
        sum++;
      }
    });

    return Math.round((sum / props.scanner.injections.length) * 100);
  };

  const countOpenPorts = (idxHost: number): number => {
    let sum = 0;

    props.scanner.hosts[idxHost].ports.forEach((port) => {
      if (port.state === "open") {
        sum++;
      }
    });

    return Math.round((sum / props.scanner.hosts[idxHost].ports.length) * 100);
  };

  return (
    <>
      <div className="view-card">
        <div className="view-card_header">
          <span className="view-card_header-text">
            Проверка на требования поисковым системах
          </span>
          <h4>Количество некорректных ссылок</h4>
          <span className="view-card_header-value">
            {100 - countCorrectUrl()} %
          </span>
          <div className="view-card_tags">
            <h4>Количество тегов "title"</h4>
            <span className="view-card_header-value">{countTitleTag()} %</span>
            <h4>Количество тегов "meta description"</h4>
            <span className="view-card_header-value">
              {countDescriptionTag()} %
            </span>
            <h4>Количество тегов "meta keywords"</h4>
            <span className="view-card_header-value">
              {countKeywordsTag()} %
            </span>
          </div>
          <Button
            variant="contained"
            onClick={() => changeLocation(NavigatorLocation.URL)}
          >
            Подробнее
          </Button>
        </div>
      </div>
      <div className="view-card">
        <div className="view-card_header">
          <span className="view-card_header-text">Проверка на уязвимости</span>
          <div className="view-card_injection">
            <h4>Количество найденных инъекций</h4>
            <span className="view-card_header-value">{countInjection()} %</span>
            <Button
              variant="contained"
              onClick={() => changeLocation(NavigatorLocation.INJECTION)}
            >
              Подробнее
            </Button>
          </div>
        </div>
      </div>
      <div className="view-card">
        <div className="view-card_header">
          <div className="view-card_host">
            <span className="view-card_header-text">
              Проверка инфраструктуры
            </span>

            {props.scanner.hosts.map((host, idx) => {
              return (
                <div className="view-card_host">
                  <span className="view-card_header-text">
                    Сканирование хоста {host.host}
                  </span>
                  <div>
                    <h3>Количество открытых портов</h3>
                    <span className="view-card_header-value">
                      {countOpenPorts(idx)} %
                    </span>
                  </div>
                </div>
              );
            })}

            <Button
              variant="contained"
              onClick={() => changeLocation(NavigatorLocation.HOST)}
            >
              Подробнее
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
