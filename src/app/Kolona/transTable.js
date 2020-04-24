import React from 'react';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CarItem from './carItem';
import SpringModal from './modal';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    marginRight: 20,
  },
});


export default function TransTable(props) {
  const classes = useStyles();
  const state = useSelector(state => state);
  const trans = state.resultsKolona.skladKolony ? state.resultsKolona.skladKolony : null;
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" scope="row">Модель</TableCell>
              <TableCell align="left">Швидкість</TableCell>
              <TableCell align="left">Маса</TableCell>
              <TableCell align="left">Місця</TableCell>
              <TableCell align="left">Об'єм</TableCell>
              <TableCell align="left">Витрати палива</TableCell>
              <TableCell align="left">Тип палива</TableCell>
              <TableCell align="left">Запас ходу</TableCell>
              <TableCell align="left">Час працездатності</TableCell>
              <TableCell align="left">Час відновлення</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.transports.map((row, index) => (
              <CarItem item={row} ind={index} included={trans} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="btn-group-kolona">
        <div>
          <SpringModal pushTrans={(data) => props.pushTrans(data)} />
        </div>
        <div>
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            component="label"
          >
            Зчитати файл
            <input
              type="file"
              style={{ display: "none" }}
              onChange={e => props.handleFileChosen(e.target.files[0])}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}