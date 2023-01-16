import axios from "axios";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";

function Chart() {
  const [startDate, setStartDate] = useState(getOneMonthBeforeDate());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [statistics, setStatistics] = useState();
  const [temperatures, setTemperatures] = useState(
    statistics.map((statistic) => parseInt(statistic.temperature))
  );
  const [hygrometries, setHygrometries] = useState(
    statistics.map((statistic) => statistic.hygrometrie)
  );
  const [sensDesVents, setSensDesVents] = useState(
    statistics.map((statistic) => statistic.sensDuVent)
  );
  const [forceDesVents, setforceDesVents] = useState(
    statistics.map((statistic) => statistic.forceDuVent)
  );
  const [timeStamps, setTimeStamps] = useState(
    statistics.map((statistic) =>
      new Date(parseInt(statistic.timeStamp) * 1000).toLocaleString()
    )
  );

  const optionsTemperature = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Température",
      },
    },
  };

  const dataTemperature = {
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
  };

  const optionsHygrometrie = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Hygrométrie",
      },
    },
  };

  const dataHygrometrie = {
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
  };

  const optionsSensDuVent = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sens des vents",
      },
    },
  };

  const dataSensDuVent = {
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
  };

  const optionsForceDuVent = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Force du vent",
      },
    },
  };

  const dataForceDuVent = {
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
  };

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
    axios
      .post(
        `http://localhost:3001/statistique`,
        {
          startDate: new Date(startDate) / 1000,
          endDate: new Date(endDate) / 1000,
        },
        {
          headers: {
            "x-access-token": "auboulot",
          },
        }
      )
      .then((response) => {
        setStatistics(response.data);
        setTemperatures(statistics.map((statistic) => statistic.temperature));
        setHygrometries(statistics.map((statistic) => statistic.hygrometrie));
        setSensDesVents(statistics.map((statistic) => statistic.sensDuVent));
        setforceDesVents(statistics.map((statistic) => statistic.forceDuVent));
      });
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
            defaultValue={getOneMonthBeforeDate()}
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
            defaultValue={getCurrentDate()}
            min={startDate ? startDate : getOneMonthBeforeDate()}
            onChange={handleSelectEndChange}
          ></input>
        </div>
      </form>
      <div>
        {startDate && endDate ? (
          <Line options={optionsTemperature} data={dataTemperature} />
        ) : (
          "Pas de graphique disponible"
        )}
        {startDate && endDate ? (
          <Line options={optionsHygrometrie} data={dataHygrometrie} />
        ) : (
          "Pas de graphique disponible"
        )}
        {startDate && endDate ? (
          <Bar options={optionsSensDuVent} data={dataSensDuVent} />
        ) : (
          "Pas de graphique disponible"
        )}
        {startDate && endDate ? (
          <Line options={optionsForceDuVent} data={dataForceDuVent} />
        ) : (
          "Pas de graphique disponible"
        )}
      </div>
    </div>
  );
}

export default Chart;
