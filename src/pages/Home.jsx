import { useState, useEffect } from "react";
import Card from "../components/Card";
import Adding from "../components/Adding";

const Home = () => {
  const [przepisy, setPrzepisy] = useState([]);
  const [sortType, setSortType] = useState("none"); // domyślnie: brak sortowania

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("przepis")) || [];
    setPrzepisy(stored);
  }, []);

  function sortPrzepisy(type, data) {
    const sorted = [...data];
    switch (type) {
      case "czas-asc":
        return sorted.sort((a, b) => parseInt(a.czas) - parseInt(b.czas));
      case "czas-desc":
        return sorted.sort((a, b) => parseInt(b.czas) - parseInt(a.czas));
      case "tytul-asc":
        return sorted.sort((a, b) => a.tytul.localeCompare(b.tytul));
      case "tytul-desc":
        return sorted.sort((a, b) => b.tytul.localeCompare(a.tytul));
      case "none":
      default:
        return data; // bez sortowania
    }
  }

  const sortedPrzepisy = sortPrzepisy(sortType, przepisy);

  return (
    <div>
      <h1>Twoje przepisy</h1>

      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="none"></option>
        <option value="czas-asc">Czas rosnąco</option>
        <option value="czas-desc">Czas malejąco</option>
        <option value="tytul-asc">Tytuł A-Z</option>
        <option value="tytul-desc">Tytuł Z-A</option>
      </select>
      <Adding operation={() => setPrzepisy(JSON.parse(localStorage.getItem("przepis")))} />
      {sortedPrzepisy.map((p) => (
        <Card
          operation={() => setPrzepisy(JSON.parse(localStorage.getItem("przepis")))}
          key={p.id}
          id={p.id}
          tytul={p.tytul}
          skladniki={p.skladniki}
          kroki={p.kroki}
          czas={p.czas}
          obrazek={p.obrazek}
          przepisy={przepisy}
        />
      ))}
    </div>
  );
};

export default Home;