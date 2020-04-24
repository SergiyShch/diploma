import React from 'react';
import TransTable from './transTable';
import {kolona} from './skladKolony';
import Obmej from './obmejenia';
import '../App.css';

class Kolona extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transports: [],
    }
  }

  componentDidMount() {
    this.setState({transports: kolona});
  }

  render() {
    let fileReader;

    const handleFileRead = (e) => {
      const content = fileReader.result;
      let parsedContent = JSON.parse(content);
      this.setState({transports: parsedContent});
    };

    const handleFileChosen = (file) => {
      fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onloadend = handleFileRead;
      return null;
    };

    const addTransport = (item) => {
      let state = this.state.transports;
      state.push(item);
      this.setState({transports: state});
    }

    return (
      <div className="kol-container">
        <h3>Колона</h3>
        {this.state.transports.length > 0 && <TransTable pushTrans={(data) => addTransport(data)} handleFileChosen={(data) => handleFileChosen(data)} transports={this.state.transports}></TransTable>}
        <Obmej transports={this.state.transports} />
      </div>
    );
  };
}

export default Kolona;