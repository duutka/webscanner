/*** NPM ***/
import React from "react";

/*** STORE ***/
import { useAppSelector } from "./app/hooks";

/*** FEATURE ***/
import Main from "./features/main/Main";
import Report from "./features/report/Report";

/*** COMPONENTS ***/
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

/*** STYLE ***/
import "./App.css";

const App = (): JSX.Element => {
  const { isReport } = useAppSelector((state) => state.scanner);

  return (
    <div className="App">
      <Header />
      {isReport ? <Report /> : <Main />}
    </div>
  );
};

export default App;
