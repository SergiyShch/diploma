import React from 'react';
import './App.css';
import Kolona from './Kolona/kolona';
import Marshrut from './Marshrut/marshrut';
import ResultContainer from './Result/result';

function App() {
  return (
    <div className="app">
      <h1>Оптимізація складу колони техніки в залежності від маршруту для руху</h1>
      <Marshrut />
      <Kolona />
      <ResultContainer />
    </div>
  );
}

export default App;
