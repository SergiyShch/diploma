import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import '../App.css';
import {calculateKolona} from './calculate';
import {saveKolona} from '../actions';

const useStyles = makeStyles({
  textBox: {
    marginTop: 10,
  },
  button: {
    marginTop: 12,
  }
});

export default function Obmej(props) {
  const classes = useStyles();
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const [time, setTime] = useState(6);
  const [koef, setKoef] = useState(0.5);
  const [mass, setMass] = useState(10);
  const [volume, setVolume] = useState(6);
  const [passangers, setPassangers] = useState(6);
  const [dp, setDp] = useState(150);
  const [a95, setA95] = useState(35);
  const [a92, setA92] = useState(115);
  const [a80, setA80] = useState(120);
  const trans = props.transports;
  const obmejennia = {
    time: time,
    koef: koef,
    mass: mass,
    volume: volume,
    passangers: passangers,
    dp: dp,
    a95: a95,
    a92: a92,
    a80: a80,
  }
  
  const start = state.resultsMarsh.start;
  const finish = state.resultsMarsh.finish;
  const points = state.resultsMarsh.points;
  
  const getKolonaResults = () => {
    const res = calculateKolona(obmejennia, trans, points, start, finish);
    return res;
  }

  const getResults = () => {
    if (state.resultsMarsh.length > 0) {
      const r = getKolonaResults();
      return dispatch(saveKolona(r));
    }
  }

  return (
    <div className="obm-container">
      <div className="obm-cell">
        <span className="text">Обмеження</span>
      </div>
      <div className="obm-cell">
        <TextField type="number" name="time" value={time} onChange={(e) => setTime(parseInt(e.target.value))} className={classes.textBox} id="outlined-basic" label="Час" variant="outlined" size='small' />
        <TextField type="number" name="koef" value={koef} onChange={(e) => setKoef(parseFloat(e.target.value))} className={classes.textBox} id="outlined-basic" label="Коефіцієнт гот." variant="outlined" size='small' />
      </div>
      <div className="obm-cell">
        <TextField type="number" name="mass" value={mass} onChange={(e) => setMass(parseInt(e.target.value))} className={classes.textBox} id="outlined-basic" label="Маса" variant="outlined" size='small' />
        <TextField type="number" name="volume" value={volume} onChange={(e) => setVolume(parseInt(e.target.value))} className={classes.textBox} id="outlined-basic" label="Об'єм" variant="outlined" size='small' />
      </div>
      <div className="obm-cell">
        <TextField type="number" name="passangers" value={passangers} onChange={(e) => setPassangers(parseInt(e.target.value))} className={classes.textBox} id="outlined-basic" label="Люди" variant="outlined" size='small' />
        <TextField type="number" name="dp" value={dp} onChange={(e) => setDp(parseInt(e.target.value))} className={classes.textBox} id="outlined-basic" label="ДП" variant="outlined" size='small' />
      </div>
      <div className="obm-cell">
        <TextField type="number" name="a95" value={a95} onChange={(e) => setA95(parseInt(e.target.value))} className={classes.textBox} id="outlined-basic" label="А-95" variant="outlined" size='small' />
        <TextField type="number" name="a92" value={a92} onChange={(e) => setA92(parseInt(e.target.value))} className={classes.textBox} id="outlined-basic" label="А-92" variant="outlined" size='small' />
      </div>
      <div className="obm-cell">
        <TextField type="number" name="a80" value={a80} onChange={(e) => setA80(parseInt(e.target.value))} className={classes.textBox} id="outlined-basic" label="А-80" variant="outlined" size='small' />
        <Button onClick={() => getResults()} className={classes.button} variant="outlined" color="primary">
          Розрахувати
        </Button>
      </div>
    </div>
  );
}
