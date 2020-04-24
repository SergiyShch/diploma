import React from 'react';
import {connect} from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Button} from '@material-ui/core';
import '../App.css';
import MarshResult from './marshrutResult';
import {calculateMarshrut, getAllTops} from './calculate';
import {saveMarshrut, saveGraph} from '../actions';
import {graph} from './graph';

class Marshrut extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      points: [],
      start: "",
      finish: "",
    }
  }

  componentDidMount() {
    const tops = getAllTops(graph);
    this.setState({points: graph, start: tops[0], finish: tops[tops.length - 1]})
  }

  render() {
    let fileReader;

    const handleFileRead = (e) => {
      const content = fileReader.result;
      let parsedContent = JSON.parse(content);
      let last = getAllTops(parsedContent);
      this.setState({points: parsedContent, start: getAllTops(parsedContent)[0], finish: getAllTops(parsedContent)[last.length - 1]});
    };

    const handleFileChosen = (file) => {
      fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onloadend = handleFileRead;
      return null;
    };

    const handleChange = (event) => {
      const {name, value} = event.target;
      this.setState({[name]: value});
    };

    const saveResult = () => {
      const res = calculateMarshrut(this.state.points, this.state.start, this.state.finish);
      
      this.props.saveMarsh(res);
    }
    
    return (
      <div className="marsh-container">
        <h3>Маршрут</h3>
        <div>
          <form className='form' noValidate autoComplete="off">
            <div className="group">
              <div className="inner-element">
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Початкова точка</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="start"
                    value={this.state.start}
                    onChange={e => handleChange(e)}
                  >
                    {getAllTops(this.state.points).map(item => 
                      <MenuItem value={item}>{item}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
              <div className="inner-element">
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Кінцева точка</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="finish"
                    value={this.state.finish}
                    onChange={e => handleChange(e)}
                  >
                    {getAllTops(this.state.points).map(item => 
                      <MenuItem value={item}>{item}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="group">
              <div className="inner-element">
              <Button
                variant="outlined"
                color="primary"
                component="label"
              >
                Зчитати файл
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={e => handleFileChosen(e.target.files[0])}
                />
              </Button>
              </div>
              <div className="inner-element">
                <Button onClick={() => saveResult()} variant="outlined" color="primary">
                  Розрахувати
                </Button>
              </div>
            </div>
          </form>
          {this.props.state.length > 0 && <MarshResult results={this.props.state.path} />}
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  state: state.resultsMarsh
})

const mapDispatchToProps = dispatch => ({
  saveGraph: graph => dispatch(saveGraph(graph)),
  saveMarsh: data => dispatch(saveMarshrut(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Marshrut);