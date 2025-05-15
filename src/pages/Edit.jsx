import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const dostepneSkladniki = ["pomidor", "pomarańcza", "woda w proszku"];

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [przepis, setPrzepis] = useState(null); // initially null
  const [selectedSkladnik, setSelectedSkladnik] = useState(dostepneSkladniki[0]);

  useEffect(() => {
    const przepisy = JSON.parse(localStorage.getItem("przepis")) || [];
    const found = przepisy.find(p => p.id === parseInt(id));
    if (found) {
      setPrzepis(found);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  function edytujIngredients() {
    if (!przepis.skladniki.includes(selectedSkladnik)) {
      const updated = [...przepis.skladniki, selectedSkladnik];
      setPrzepis(prev => ({ ...prev, skladniki: updated }));
    } else {
      alert("Ten składnik już istnieje!");
    }
  }

  function removeSkladnik(skladnik) {
    const updated = przepis.skladniki.filter(s => s !== skladnik);
    setPrzepis(prev => ({ ...prev, skladniki: updated }));
  }

  function edycjaDanych() {
    if (
      przepis.tytul?.trim() &&
      Array.isArray(przepis.skladniki) && przepis.skladniki.length > 0 &&
      przepis.kroki?.trim() &&
      !isNaN(przepis.czas) && przepis.czas >= 0
    ) {
      const tmp = JSON.parse(localStorage.getItem("przepis")) || [];
      const updated = tmp.map(p => p.id === przepis.id ? przepis : p);
      localStorage.setItem("przepis", JSON.stringify(updated));
      navigate(-1);
    }
  }

  if (!przepis) return <div>Ładowanie...</div>; // loading fallback

  return (
    <div>
      <h1>Edytowanie przepisu</h1>
      <input
        value={przepis.tytul}
        onChange={(e) => setPrzepis(prev => ({ ...prev, tytul: e.target.value }))}
      />
      <select
        value={selectedSkladnik}
        onChange={(e) => setSelectedSkladnik(e.target.value)}
      >
        {dostepneSkladniki.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <button onClick={edytujIngredients}>Dodaj składnik</button>
      <ul>
        {przepis.skladniki.map((s, i) => (
          <li key={i}>
            {s}
            <button onClick={() => removeSkladnik(s)}>
              <img src="/trash3-fill.svg" alt="trash" width="25" height="25" />
            </button>
          </li>
        ))}
      </ul>
      <input
        value={przepis.kroki}
        onChange={(e) => setPrzepis(prev => ({ ...prev, kroki: e.target.value }))}
        placeholder="kroki"
      />
      <input
        value={przepis.czas}
        onChange={(e) => setPrzepis(prev => ({ ...prev, czas: e.target.value }))}
        placeholder="czas"
      />
      <button onClick={edycjaDanych}>Zmień dane</button>
    </div>
  );
}

export default Edit;
