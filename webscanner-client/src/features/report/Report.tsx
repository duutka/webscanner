/*** NPM ***/
import React from "react";

/*** HOOKS ***/
import { useAction, useAppSelector } from "../../app/hooks";

/*** NAVIGATION ***/
import { NavigatorLocation } from "../../app/navigator/navigatorReducer";

/*** COMPONENTS ***/
import Url from "../../components/navigator/url/Url";
import Sitemap from "../../components/navigator/sitemap/Sitemap";
import Robots from "../../components/navigator/robots/Robots";
import Injection from "../../components/navigator/injection/Injection";
import Host from "../../components/navigator/host/Host";
import File from "../../components/navigator/file/File";
import Bruteforce from "../../components/navigator/bruteforce/Bruteforce";
import Auth from "../../components/navigator/auth/Auth";
import Default from "../../components/navigator/Default";
import Sidebar from "../../components/sidebar/Sidebar";
import View from "../../components/navigator/view/View";

const Report = (): JSX.Element => {
  const { scanner } = useAppSelector((state) => state.scanner);
  const { location } = useAppSelector((state) => state.navigator);
  const { changeLocation } = useAction();

  React.useEffect(() => {
    changeLocation(NavigatorLocation.VIEW);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const report = (): JSX.Element => {
    if (scanner && scanner.seo && scanner.auth && scanner.bruteforce) {
      switch (location) {
        case NavigatorLocation.VIEW:
          return <Default title="Обзор" child={<View scanner={scanner} />} />;
        case NavigatorLocation.URL:
          return (
            <Default
              title="Проверка URL"
              child={<Url urls={scanner.seo.urls || null} />}
            />
          );
        case NavigatorLocation.SITEMAP:
          return (
            <Default
              title="Файлы sitemap"
              child={<Sitemap sitemap={scanner.seo.sitemap} />}
            />
          );
        case NavigatorLocation.ROBOTS:
          return (
            <Default
              title="Файлы robots"
              child={<Robots robots={scanner.seo.robots} />}
            />
          );
        case NavigatorLocation.INJECTION:
          return (
            <Default
              title="Инъекции"
              child={<Injection injections={scanner.injections} />}
            />
          );
        case NavigatorLocation.HOST:
          return (
            <Default title="Хостинг" child={<Host hosts={scanner.hosts} />} />
          );
        case NavigatorLocation.BRUTEFORCE:
          return (
            <Default
              title="Подбор паролей"
              child={<Bruteforce bruteForce={scanner.bruteforce} />}
            />
          );
        case NavigatorLocation.AUTH:
          return (
            <Default title="Авторизация" child={<Auth auth={scanner.auth} />} />
          );
        case NavigatorLocation.FILE:
          return (
            <Default
              title="Файловая система"
              child={<File httpenum={scanner.httpenum} />}
            />
          );
        default:
          return <></>;
      }
    } else {
      return (
        <>
          Произошла ошибка при сканировании. Перезагрузите страницу и повторите
          попытку
        </>
      );
    }
  };

  return (
    <>
      <div className="content">
        <Sidebar />
        {report()}
      </div>
    </>
  );
};

export default Report;
