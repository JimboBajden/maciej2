import Card from "../components/Card";
import { useState, useEffect } from "react";
function Ulubione(){
    const tmp = JSON.parse(localStorage.getItem('przepis'));
    function tablica(){
        let tab = []
        for(let i = 0 ; i < tmp.length ; i++){
            if(tmp[i].ulubione == true){
                tab.push(tmp[i])
            }
        }
        return tab
    }
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
    const [sortType, setSortType] = useState("none"); // domyślnie: brak sortowania
    const sortedPrzepisy = sortPrzepisy(sortType,tablica());
    return(
        <div>
            <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                <option value="none"></option>
                <option value="czas-asc">Czas rosnąco</option>
                <option value="czas-desc">Czas malejąco</option>
                <option value="tytul-asc">Tytuł A-Z</option>
                <option value="tytul-desc">Tytuł Z-A</option>
            </select>
            {
                sortedPrzepisy.map((p)=>(
                <Card 
                obrazek={p.obrazek}
                przepisy={p.przepisy} 
                id={p.id} key={p.id} 
                tytul={p.tytul} 
                skladniki={p.skladniki} 
                kroki={p.kroki} 
                czas={p.czas} >
                </Card>
                ))
            }
            
        </div>
    )
}


export default Ulubione