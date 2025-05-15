import { useState } from "react";

const dostepneSkladniki = ["pomidor", "pomarańcza", "woda w proszku"];

function Adding({operation}) {
  const [tytul, setTytul] = useState('');
  const [skladniki, setSkladniki] = useState([]);
  const [kroki, setKroki] = useState('');
  const [czas, setCzas] = useState('');
  const [selectedSkladnik, setSelectedSkladnik] = useState(dostepneSkladniki[0]);
  const [obraz, setImg] = useState(null);

  function addSkladnik() {
    if (!skladniki.includes(selectedSkladnik)) {
      setSkladniki([...skladniki, selectedSkladnik]);
    } else {
      alert('Ten składnik już został dodany!');
    }
  }

  function handleImageChange(e) {
    let file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onloadend = () => setImg(reader.result);
    reader.readAsDataURL(file);
  }

  function dane() {
    if (!tytul.trim() || !kroki.trim() || isNaN(czas) || czas < 0 || skladniki.length === 0) {
      alert("Uzupełnij poprawnie wszystkie pola!");
      return;
    }

    const tmp = JSON.parse(localStorage.getItem('przepis')) || [];
    const highestId = tmp.reduce((max, item) => item.id > max ? item.id : max, 0);
    const nextId = highestId + 1;

    const nowy = {
      id: nextId,
      tytul,
      skladniki,
      kroki,
      czas,
      obrazek: obraz,
      ulubione: false
    };

    tmp.push(nowy);
    localStorage.setItem('przepis', JSON.stringify(tmp));

    // Reset form
    setTytul('');
    setKroki('');
    setSkladniki([]);
    setCzas('');
    setImg(null);
    operation()
  }

  function removeSkladnikDodawanie(ktory) {
    setSkladniki(skladniki.filter(skladnik => skladnik !== ktory));
  }

  function resetForm() {
    setTytul('');
    setSkladniki([]);
    setCzas('');
    setKroki('');
    setImg(null);
  }

  return (
    <div>
      <input
        value={tytul}
        onChange={(e) => setTytul(e.target.value)}
        placeholder="tytuł przepisu"
      />

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

      <button onClick={addSkladnik}>dodaj składnik</button>
      <button onClick={resetForm}>reset</button>

      <ul>
        {skladniki.map((s, i) => (
          <li key={i}>
            {s}
            <button onClick={() => removeSkladnikDodawanie(s)}>
              <img src="/trash3-fill.svg" alt="Usuń" style={{ width: '25px', height: '25px' }} />
            </button>
          </li>
        ))}
      </ul>

      <input
        value={kroki}
        onChange={(e) => setKroki(e.target.value)}
        placeholder="kroki"
      />
      <input
        value={czas}
        onChange={(e) => setCzas(e.target.value)}
        placeholder="czas (min)"
        type="number"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {obraz && (
        <img
          src={obraz}
          alt="Podgląd"
          style={{ width: '50px', height: '50px' }}
        />
      )}

      <button onClick={dane}>Utwórz przepis</button>
    </div>
  );
}

export default Adding;
