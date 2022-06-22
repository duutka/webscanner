/*** NPM ***/
import React from "react";

/*** STYLE ***/
import "./Host.css";

/*** MODELS ***/
import { IHost } from "../../../models/scanner";

interface IProps {
  hosts: IHost[];
}

const Host = (props: IProps): JSX.Element => {
  const countOpenPorts = (idxHost: number): number => {
    let sum = 0;

    props.hosts[idxHost].ports.forEach((port) => {
      if (port.state === "open") {
        sum++;
      }
    });

    return Math.round((sum / props.hosts[idxHost].ports.length) * 100);
  };

  return (
    <>
      <div className="host-card">
        {props.hosts.map((host, idx) => {
          return (
            <>
              <div className="host-card_header">
                <span className="host-card_header-text">
                  Количество открытых портов для хоста {host.host}
                </span>
                <span className="host-card_header-value">
                  {countOpenPorts(idx)} %
                </span>
              </div>
              <h3>
                Сканирование портов для хоста {host.host} - {host.status}
              </h3>

              <table>
                <thead>
                  <tr>
                    <th>Порт</th>
                    <th>Статус</th>
                    <th>Сервис</th>
                    <th>Протокол</th>
                  </tr>
                </thead>
                <tbody>
                  {host.ports.map((port, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{port.port}</td>
                        <td>{port.state}</td>
                        <td>{port.service}</td>
                        <td>{port.protocol}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          );
        })}
      </div>
      <div className="host-card">
        {props.hosts.map((host, idx) => {
          return (
            <>
              <div className="host-card_header">
                <span className="host-card_header-text">
                  Проверка наличия CVE уязвимостей для портов для хоста{" "}
                  {host.host}
                </span>
              </div>

              {host.ports.map((port) => {
                return (
                  <>
                    <h3>Порт - {port.port}</h3>
                    {port.cve && port.cve.includes("CVE") ? (
                      <>
                        <h3 className="error">Обнаружены CVE уязвимости</h3>
                        {port.cve.split("*EXPLOIT*").map((value) => {
                          return <span>{value}</span>;
                        })}
                      </>
                    ) : (
                      <>
                        <h3>CVE Уязвимости для данного порт не обнаружены</h3>
                      </>
                    )}
                  </>
                );
              })}
            </>
          );
        })}
      </div>
    </>
  );
};

export default Host;
