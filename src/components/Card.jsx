import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Card({ tytul, skladniki, kroki, czas, obrazek, id, operation }) {
  const [isUlubione, setIsUlubione] = useState(false);

  // Read the `ulubione` value from localStorage when the component mounts
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("przepis")) || [];
    const przepis = stored.find((p) => p.id === id);
    if (przepis) {
      setIsUlubione(przepis.ulubione || false); // Default to false if `ulubione` is not set
    }
  }, [id]);

  function removePrzepis() {
    const stored = JSON.parse(localStorage.getItem("przepis")) || [];
    const updated = stored.filter((p) => p.id !== id);
    localStorage.setItem("przepis", JSON.stringify(updated));
    operation(); // Call the operation function
  }

  function toggleUlubione() {
    const stored = JSON.parse(localStorage.getItem("przepis")) || [];
    const updated = stored.map((p) => {
      if (p.id === id) {
        const newUlubione = !p.ulubione; // Toggle the ulubione property
        setIsUlubione(newUlubione); // Update the local state
        return { ...p, ulubione: newUlubione };
      }
      return p;
    });
    localStorage.setItem("przepis", JSON.stringify(updated));
    operation(); // Update the przepisy state in the parent component
  }

  return (
    <div className="card">
      <div className="img-container">
        {obrazek && (
          <img
            style={{ width: "100px", height: "100px" }}
            src={obrazek}
            alt="Preview"
          />
        )}
      </div>
      
      <div className="header">
        <h2 className="tytul">{tytul}</h2>
        <p className="czas">{czas + " min"}</p>
      </div>
      
      <div className="skladniki">
        <h3>Składniki:</h3>
        {skladniki.map((skladnik, index) => (
          <p key={index}>- {skladnik}</p>
        ))}
      </div>
      <p>{kroki}</p>
      <div>
        <Link to={`/Edit/${id}`}>
          <button><img className="icon" src="pen.svg" alt="Edit" /></button>
        </Link>
        <button onClick={removePrzepis}><img className="icon" src="trash3-fill.svg" alt="Delete" /></button>
        <Link to={`/Selected/${id}`}>
          <button><img className="icon" src="search.svg" alt="Search" /></button>
        </Link>
        <button onClick={toggleUlubione}>
          <img
            className="icon"
            src={isUlubione ? "star-fill.svg" : "star.svg"}
            alt={isUlubione ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
          />
        </button>
      </div>
    </div>
  );
}

export default Card;