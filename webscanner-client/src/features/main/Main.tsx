/*** NPM ***/
import React from "react";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

/*** HOOKS ***/
import { useAction, useAppSelector } from "../../app/hooks";

/*** MODELS ***/
import { IScanner } from "../../models/scanner";

/*** COMPONENTS ***/
import { Waiter } from "../../components/progress/Waiter";

const Main = (): JSX.Element => {
  const [url, setUrl] = React.useState<string>("");

  const { isLoading, error } = useAppSelector((state) => state.scanner);

  const { postScanner } = useAction();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setUrl(value);
  };

  const handleButton = (): void => {
    const scanner: IScanner = {
      url: url,
      injections: [],
      hosts: [],
      httpenum: [],
      seo: null,
      bruteforce: null,
      auth: null,
    };

    postScanner(scanner);
  };

  return (
    <main className="App-main">
      <div className="App-main-card">
        <div className="App-main-card_form">
          <h1 className="App-main-card__h1">Сканер для интернет-магазина</h1>
          <TextField
            value={url}
            onChange={handleInput}
            placeholder="https://example.ru"
            variant="outlined"
            size="small"
            label="Цель сканирования"
          />
          <Button
            variant="contained"
            endIcon={<SearchIcon />}
            onClick={() => handleButton()}
          >
            Начать сканирование
          </Button>

          {isLoading ? (
            <>
              <h3>Идет процесс сканирования...</h3>
              <Waiter isLoading={isLoading} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
