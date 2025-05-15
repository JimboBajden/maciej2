import { Link } from "react-router-dom";

function Card({ tytul, skladniki, kroki, czas, obrazek, children, id, operation }) {
  function removePrzepis() {
    const stored = JSON.parse(localStorage.getItem("przepis")) || [];
    const updated = stored.filter(p => p.id !== id);
    localStorage.setItem("przepis", JSON.stringify(updated));
    operation(); // Call the operation function
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
      </div>
    </div>
  );
}

export default Card;