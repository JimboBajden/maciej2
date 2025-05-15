import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Selected() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [przepis, setPrzepis] = useState(null); // initially null

  useEffect(() => {
    const przepisy = JSON.parse(localStorage.getItem("przepis")) || [];
    const found = przepisy.find(p => p.id === parseInt(id));
    if (found) {
      setPrzepis(found);
    } else {
      navigate('/'); // ✅ safe inside useEffect
    }
  }, [id, navigate]);

  return (
    <div>
        <button onClick={(e)=>{e.target.style.display = 'none'; window.print() ;e.target.style.display = 'inline'}}>druknij</button>
      {przepis && (
        <div>
          <h1>{przepis.tytul}</h1>
          {przepis.obrazek && (przepis.obrazek.startsWith("data:image/") || przepisy.obrazek.startsWith("http")) ? (
            <img src={przepis.obrazek} alt="Preview" style={{ width: '100px', height: '100px' }} />
          ) : null}
          <p><strong>Czas:</strong> {przepis.czas} min</p>
          <h3>Składniki:</h3>
          <ul>
            {przepis.skladniki.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <p><strong>Kroki:</strong></p>
          <p>{przepis.kroki}</p>
        </div>
      )}
    </div>
  );
}

export default Selected;
