import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid grey',
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    marginRight: 20,
  },
  textBox: {
    marginBottom: 10,  
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [model, setModel] = React.useState('');
  const [speed, setSpeed] = React.useState('');
  const [masa, setMasa] = React.useState('');
  const [pasag, setPasag] = React.useState('');
  const [ob, setOb] = React.useState('');
  const [pal, setPal] = React.useState('');
  const [palType, setPalType] = React.useState('');
  const [zapas, setZapas] = React.useState('');
  const [tpraz, setTpraz] = React.useState('');
  const [tvid, setTvid] = React.useState('');



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const obj = {"marka": model, "v": speed, "m": masa, "pas":pasag, "ob": ob, "pal": pal, "typePal":palType, "zh": zapas, "tpr": tpraz, "tvid": tvid}
    props.pushTrans(obj);
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Додати транспортний засіб</h2>
      <p id="simple-modal-description">
        Характеристики транспортного засобу
      </p>
      <TextField
        type="text"
        name="model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className={classes.textBox} id="outlined-basic"
        label="Модель" variant="outlined" size='small'
      />
      <TextField
        type="number"
        name="speed"
        value={speed}
        onChange={(e) => setSpeed(parseInt(e.target.value))}
        className={classes.textBox} id="outlined-basic"
        label="Швидкість" variant="outlined" size='small'
      />
      <TextField
        type="number"
        name="masa"
        value={masa}
        onChange={(e) => setMasa(parseInt(e.target.value))}
        className={classes.textBox} id="outlined-basic"
        label="Маса" variant="outlined" size='small'
      />
      <TextField
        type="number"
        name="pasag"
        value={pasag}
        onChange={(e) => setPasag(parseInt(e.target.value))}
        className={classes.textBox} id="outlined-basic"
        label="Місця" variant="outlined" size='small'
      />
      <TextField
        type="number"
        name="ob"
        value={ob}
        onChange={(e) => setOb(parseInt(e.target.value))}
        className={classes.textBox} id="outlined-basic"
        label="Об'єм" variant="outlined" size='small'
      />
      <TextField
        type="number"
        name="pal"
        value={pal}
        onChange={(e) => setPal(parseInt(e.target.value))}
        className={classes.textBox} id="outlined-basic"
        label="Паливо" variant="outlined" size='small'
      />
      <TextField
        type="text"
        name="palType"
        value={palType}
        onChange={(e) => setPalType(e.target.value)}
        className={classes.textBox} id="outlined-basic"
        label="Тип палива" variant="outlined" size='small'
      />
      <TextField
        type="number"
        name="zapas"
        value={zapas}
        onChange={(e) => setZapas(parseInt(e.target.value))}
        className={classes.textBox} id="outlined-basic"
        label="Запас ходу" variant="outlined" size='small'
      />
      <TextField
        type="number"
        name="tpraz"
        value={tpraz}
        onChange={(e) => setTpraz(parseInt(e.target.value))}
        className={classes.textBox} id="outlined-basic"
        label="Час працездатності" variant="outlined" size='small'
      />
      <TextField
        type="number"
        name="tvid"
        value={tvid}
        onChange={(e) => setTvid(parseInt(e.target.value))}
        className={classes.textBox} id="outlined-basic"
        label="Час відновлення" variant="outlined" size='small'
      />
      <Button type="button" onClick={handleClose}>
        Зберегти
      </Button>
    </div>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        Open Modal
      </button> */}
      <Button className={classes.button} onClick={() => handleOpen()} variant="outlined" color="primary">
        Додати
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}