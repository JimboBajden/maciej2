import { useState, useEffect } from "react";
import Card from "../components/Card";

const dostepneSkladniki = ["pomidor", "pomarańcza", "woda w proszku"]; // You can expand this

function Search() {
  const [selectedSkladnik, setSelectedSkladnik] = useState(dostepneSkladniki[0]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [allPrzepisy, setAllPrzepisy] = useState([]);

  // Load all przepisy from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("przepis")) || [];
    setAllPrzepisy(stored);
  }, []);

  // Update filtered results whenever activeFilters change
  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredResults([]);
      return;
    }

    const results = allPrzepisy.filter((p) =>
      activeFilters.every((skladnik) => p.skladniki.includes(skladnik))
    );

    setFilteredResults(results);
  }, [activeFilters, allPrzepisy]);

  // Add a selected ingredient to active filters
  const addSkladnik = () => {
    if (!activeFilters.includes(selectedSkladnik)) {
      setActiveFilters([...activeFilters, selectedSkladnik]);
    } else {
      alert("Ten składnik jest już dodany do filtrów.");
    }
  };

  // Remove an ingredient from active filters
  const removeSkladnik = (skladnikToRemove) => {
    setActiveFilters(activeFilters.filter(s => s !== skladnikToRemove));
  };

  return (
    <div>
      <h2>Wyszukaj przepisy po składnikach</h2>

      <select
        value={selectedSkladnik}
        onChange={(e) => setSelectedSkladnik(e.target.value)}
      >
        {dostepneSkladniki.map((skladnik) => (
          <option key={skladnik} value={skladnik}>
            {skladnik}
          </option>
        ))}
      </select>

      <button onClick={addSkladnik}>Dodaj składnik do wyszukiwania</button>

      {activeFilters.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Aktywne składniki filtrów:</strong>
          <ul>
            {activeFilters.map((s) => (
              <li key={s}>
                {s}{" "}
                <button onClick={() => removeSkladnik(s)}>Usuń</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3>Wyniki:</h3>
        {filteredResults.length > 0 ? (
          filteredResults.map((p) => (
            <Card
              key={p.id}
              id={p.id}
              tytul={p.tytul}
              skladniki={p.skladniki}
              kroki={p.kroki}
              czas={p.czas}
              obrazek={p.obrazek}
            />
          ))
        ) : activeFilters.length === 0 ? (
          <p>Wybierz składniki, aby rozpocząć wyszukiwanie.</p>
        ) : (
          <p>Brak przepisów pasujących do wybranych składników.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
