import axios from "axios";
// SANS API  : fakedatas à commenter
import { fakedatas } from "./fakedata";
import { useCallback, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as Graphic, registerables } from "chart.js";
import { useEffect } from "react";
Graphic.register(...registerables);

function Chart() {
  const [startDate, setStartDate] = useState(getOneMonthBeforeDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [temperatures, setTemperatures] = useState();
  const [hygrometries, setHygrometries] = useState();
  const [sensDesVents, setSensDesVents] = useState();
  const [forceDesVents, setForceDesVents] = useState();
  const [graphConfigurations, setGraphConfigurations] = useState();
  const [timeStamps, setTimeStamps] = useState();

  const initGraphics = useCallback(() => {
    setGraphConfigurations({
      optionsTemperature: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Température",
          },
        },
      },

      dataTemperature: {
        labels: timeStamps,
        datasets: [
          {
            label: "Températures (°C)",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: temperatures,
            tension: 0.3,
          },
        ],
      },
      optionsHygrometrie: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Hygrométrie",
          },
        },
      },

      dataHygrometrie: {
        labels: timeStamps,
        datasets: [
          {
            label: "Hygrométrie (%)",
            backgroundColor: "rgb(213, 184, 255)",
            borderColor: "rgb(213, 184, 255)",
            data: hygrometries,
            tension: 0.3,
          },
        ],
      },

      optionsSensDuVent: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Sens des vents",
          },
        },
      },

      dataSensDuVent: {
        labels: timeStamps,
        datasets: [
          {
            label: "Sens des vents (0 - 360°)",
            backgroundColor: "rgb(104, 195, 163)",
            borderColor: "rgb(104, 195, 163)",
            data: sensDesVents,
            tension: 0.3,
          },
        ],
      },

      optionsForceDuVent: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Force du vent",
          },
        },
      },

      dataForceDuVent: {
        labels: timeStamps,
        datasets: [
          {
            label: "Force du vent (m/s)",
            backgroundColor: "rgb(53, 162, 235)",
            borderColor: "rgb(53, 162, 235)",
            data: forceDesVents,
            tension: 0.3,
          },
        ],
      },
    });
  }, [temperatures, hygrometries, sensDesVents, forceDesVents, timeStamps]);

  useEffect(() => {
    initGraphics();
  }, [
    temperatures,
    hygrometries,
    sensDesVents,
    forceDesVents,
    timeStamps,
    initGraphics,
  ]);

  useEffect(() => {
    initStatistics();
  }, []);

  function handleSelectStartChange(e) {
    setStartDate(e.target.value);

    if (startDate && endDate) {
      initStatistics();
    }
  }

  function handleSelectEndChange(e) {
    setEndDate(e.target.value);

    if (startDate && endDate) {
      initStatistics();
    }
  }

  function initStatistics() {
    // AVEC API : à décommenter
    // axios
    //   .post(
    //     `http://localhost:3001/statistique`,
    //     {
    //       startDate: new Date(startDate) / 1000,
    //       endDate: new Date(endDate) / 1000,
    //     },
    //     {
    //       headers: {
    //         "x-access-token": "auboulot",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     setTemperatures(response.data?.map((statistic) => statistic.temperature) ?? []);
    //     setHygrometries(response.data?.map((statistic) => statistic.hygrometrie) ?? []);
    //     setSensDesVents(response.data?.map((statistic) => statistic.sensDuVent) ?? []);
    //     setForceDesVents(response.data?.map((statistic) => statistic.forceDuVent) ?? [] );
    //     setTimeStamps(response.data?.map((statistic) => new Date(parseInt(statistic.timeStamp) * 1000).toLocaleString()) ?? []);
    //   });

    // SANS API : à commenter
    setTemperatures(
      fakedatas.statistics.map((statistic) => statistic.temperature)
    );
    setHygrometries(
      fakedatas.statistics.map((statistic) => statistic.hygrometrie)
    );
    setSensDesVents(
      fakedatas.statistics.map((statistic) => statistic.sensDuVent)
    );
    setForceDesVents(
      fakedatas.statistics.map((statistic) => statistic.forceDuVent)
    );
    setTimeStamps(fakedatas.statistics.map((statistic) => statistic.timeStamp));
  }

  function getCurrentDate() {
    let curr = new Date();
    curr.setDate(curr.getDate());
    return curr.toISOString().substring(0, 10);
  }

  function getOneMonthBeforeDate() {
    let curr = new Date();
    curr.setDate(curr.getDate() - 30);
    return curr.toISOString().substring(0, 10);
  }

  return (
    <div>
      <h2>Afficher les températures</h2>
      <form>
        <div>
          <label htmlFor="start">Start date:</label>
          <input
            type="date"
            id="start"
            name="start"
            defaultValue={startDate}
            max={endDate ? endDate : getCurrentDate()}
            onChange={handleSelectStartChange}
          ></input>
        </div>
        <div>
          <label htmlFor="end">End date:</label>
          <input
            type="date"
            id="end"
            name="end"
            defaultValue={endDate}
            min={startDate ? startDate : getOneMonthBeforeDate()}
            onChange={handleSelectEndChange}
          ></input>
        </div>
      </form>
      <div>
        <div>
          {temperatures ? (
            <Line
              options={graphConfigurations?.optionsTemperature}
              data={graphConfigurations?.dataTemperature}
            />
          ) : (
            "Pas de graphique disponible"
          )}
        </div>
        <div>
          {hygrometries ? (
            <Line
              options={graphConfigurations?.optionsHygrometrie}
              data={graphConfigurations?.dataHygrometrie}
            />
          ) : (
            "Pas de graphique disponible"
          )}
        </div>
        <div>
          {sensDesVents ? (
            <Bar
              options={graphConfigurations?.optionsSensDuVent}
              data={graphConfigurations?.dataSensDuVent}
            />
          ) : (
            "Pas de graphique disponible"
          )}
        </div>
        <div>
          {forceDesVents ? (
            <Line
              options={graphConfigurations?.optionsForceDuVent}
              data={graphConfigurations?.dataForceDuVent}
            />
          ) : (
            "Pas de graphique disponible"
          )}
        </div>
      </div>
    </div>
  );
}

export default Chart;
