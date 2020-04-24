import React from 'react';
import {useSelector} from 'react-redux';
import '../App.css';

export default function ResultContainer(props) {
  const state = useSelector(state => state);

  const kolona = Object.keys(state.resultsKolona).length > 0 ? true : false;
  const st = state.resultsKolona["skladKolony"];
  const trans = st ? st.map(item => item.marka) : null;

  return (Object.keys(state.resultsMarsh).length > 0 &&
    <div className="resultContainer">
      <h3>Результати оптимізації</h3>
      <span>Кількість вершин графа:</span>
      <span className="red-text">{state.resultsMarsh["tops"]}</span>
      <span>Оптимальний по довжині маршрут для руху:</span>
      <span className="red-text">{state.resultsMarsh["path"].join(' -> ') + '( ' + state.resultsMarsh["length"] + ' км )'}</span>
      {kolona &&
      <div className="kolonaResults">
        <span>Оптимальні результати:</span>
        <span>Оптимальний маршрут для руху:</span>
        <span className="red-text">{state.resultsKolona["path"].join(" -> ") + '( ' + state.resultsKolona["time"].toFixed(2) + ' год )'}</span>
        <span>Оптимальний склад колони:</span>
        <span className="red-text">{trans.join(', ')}</span>
      </div>}
    </div>
  );
}