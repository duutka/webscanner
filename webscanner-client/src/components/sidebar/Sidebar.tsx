/*** NPM ***/
import React from "react";

/*** HOOKS ***/
import { useAction } from "../../app/hooks";

/*** NAVIGATION ***/
import { NavigatorLocation } from "../../app/navigator/navigatorReducer";

/*** STYLE ***/
import "./Sidebar.css";

/*** ICON ***/
import { ReactComponent as Home } from "../../assets/icons/home.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as Sitemap } from "../../assets/icons/sitemap.svg";
import { ReactComponent as Injection } from "../../assets/icons/injection.svg";
import { ReactComponent as Host } from "../../assets/icons/host.svg";
import { ReactComponent as Robots } from "../../assets/icons/robots.svg";
import { ReactComponent as Bruteforce } from "../../assets/icons/bruteforce.svg";
import { ReactComponent as Enter } from "../../assets/icons/enter.svg";
import { ReactComponent as Files } from "../../assets/icons/files.svg";

const Sidebar = (): JSX.Element => {
  const { changeLocation } = useAction();

  return (
    <nav className="sidebar">
      <div className="sidebar-item">
        <label className="sidebar-item_description">
          Результаты сканирования
        </label>
        <div
          tabIndex={1}
          onClick={() => changeLocation(NavigatorLocation.VIEW)}
          className="sidebar-item_tab"
        >
          <div className="sidebar-item_tab-icon">
            <Home width={24} height={24} />
          </div>
          <span className="sidebar-item_tab-text">Обзор</span>
        </div>
        <div
          tabIndex={2}
          onClick={() => changeLocation(NavigatorLocation.URL)}
          className="sidebar-item_tab"
        >
          <div className="sidebar-item_tab-icon">
            <Search width={24} height={24} />
          </div>
          <span className="sidebar-item_tab-text">Проверка URL</span>
        </div>
        <div
          tabIndex={3}
          onClick={() => changeLocation(NavigatorLocation.SITEMAP)}
          className="sidebar-item_tab"
        >
          <div className="sidebar-item_tab-icon">
            <Sitemap width={24} height={24} />
          </div>
          <span className="sidebar-item_tab-text">Файлы sitemap</span>
        </div>
        <div
          tabIndex={4}
          onClick={() => changeLocation(NavigatorLocation.ROBOTS)}
          className="sidebar-item_tab"
        >
          <div className="sidebar-item_tab-icon">
            <Robots width={24} height={24} />
          </div>
          <span className="sidebar-item_tab-text">Файлы robots</span>
        </div>
      </div>
      <div className="sidebar-item">
        <label className="sidebar-item_description">Уязвимости</label>
        <div
          tabIndex={5}
          onClick={() => changeLocation(NavigatorLocation.INJECTION)}
          className="sidebar-item_tab"
        >
          <div className="sidebar-item_tab-icon">
            <Injection width={24} height={24} />
          </div>
          <span className="sidebar-item_tab-text">Инъекции</span>
        </div>
      </div>
      <div className="sidebar-item">
        <label className="sidebar-item_description">Сеть</label>
        <div
          tabIndex={6}
          onClick={() => changeLocation(NavigatorLocation.HOST)}
          className="sidebar-item_tab"
        >
          <div className="sidebar-item_tab-icon">
            <Host width={24} height={24} />
          </div>
          <span className="sidebar-item_tab-text">Хостинг</span>
        </div>
        <div
          tabIndex={7}
          onClick={() => changeLocation(NavigatorLocation.BRUTEFORCE)}
          className="sidebar-item_tab"
        >
          <div className="sidebar-item_tab-icon">
            <Bruteforce width={24} height={24} />
          </div>
          <span className="sidebar-item_tab-text">Подбор паролей</span>
        </div>
        <div
          tabIndex={8}
          onClick={() => changeLocation(NavigatorLocation.AUTH)}
          className="sidebar-item_tab"
        >
          <div className="sidebar-item_tab-icon">
            <Enter width={24} height={24} />
          </div>
          <span className="sidebar-item_tab-text">Авторизация</span>
        </div>
        <div
          tabIndex={9}
          onClick={() => changeLocation(NavigatorLocation.FILE)}
          className="sidebar-item_tab"
        >
          <div className="sidebar-item_tab-icon">
            <Files width={24} height={24} />
          </div>
          <span className="sidebar-item_tab-text">Файловая система</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
