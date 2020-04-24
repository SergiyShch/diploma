import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  row: {
    color: 'red',
  }
});

function CarItem({item, ind, included}) {
  const classes = useStyles();
  const inKolona = included ? included.find(element => item.marka === element.marka) : '';
  
  return (
    <TableRow key={ind}>
      <TableCell className={inKolona && classes.row} component="th" scope="row">{item.marka}</TableCell>
      <TableCell className={inKolona && classes.row} align="center">{item.v}</TableCell>
      <TableCell className={inKolona && classes.row} align="center">{item.m}</TableCell>
      <TableCell className={inKolona && classes.row} align="center">{item.pas}</TableCell>
      <TableCell className={inKolona && classes.row} align="center">{item.ob}</TableCell>
      <TableCell className={inKolona && classes.row} align="center">{item.pal}</TableCell>
      <TableCell className={inKolona && classes.row} align="center">{item.typePal}</TableCell>
      <TableCell className={inKolona && classes.row} align="center">{item.zh}</TableCell>
      <TableCell className={inKolona && classes.row} align="center">{item.tpr}</TableCell>
      <TableCell className={inKolona && classes.row} align="center">{item.tvid}</TableCell>
    </TableRow>
  );
}

export default CarItem;