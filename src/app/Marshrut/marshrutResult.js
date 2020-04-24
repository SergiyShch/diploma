import React from 'react';
import '../App.css';

export default function MarshResults({results}) {
  let marsh = results.join(' -> ');

  return (
    <div className="marsh-res-container">
      <span className="color-red">Оптимальний за довжиною маршрут: </span>
      <span className="color-red">{marsh}</span>
    </div>
  )
}