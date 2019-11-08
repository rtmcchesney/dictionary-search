import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      definitions: ["Enter a Word to get a Definition"]
    };
  }

  handleGetData = () => {
    axios
      .get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.state.word}?key=a626fb01-5f46-4319-b12d-64a35be8f29b`
      )
      .then(res => res)
      .then(data => {
        if (data.data.length === 0) {
          this.setState({ definitions: ["Not a recognized word"] });
        } else {
          this.setState({
            definitions: [
              data.data[0].shortdef !== undefined
                ? data.data[0].shortdef
                : ["No word was entered"]
            ]
          });
        }
      });
  };

  handleMap = () => {
    return this.state.definitions.map(item => {
      return <p>{item}</p>;
    });
  };

  handleOnSubmit = e => {
    this.setState({ definitions: ["Getting definitions..."] });
    e.preventDefault();
    this.handleGetData();
  };

  render() {
    return (
      <div className="App">
        <h1>Epic Word Definer</h1>
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            placeholder="Search for a word.."
            onChange={e => {
              this.setState({ word: e.target.value });
            }}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="definitions">
          <h3>Definition</h3> <br />{" "}
          <div className="actual_defs">{this.handleMap()}</div>
        </div>
      </div>
    );
  }
}

export default App;
