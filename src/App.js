import Chart from "./components/chart";
import LineChart from "./components/LineChart";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Affichage des données</h1>
      </header>
      <Routes>
        <Route path="/" element={<Chart />}></Route>
      </Routes>
    </div>
  );
}

export default App;
