import React, {Component} from "react";
import './Joke.css';

class Joke extends Component {
  constructor(props) {
    super(props);
		this.handleUpVote = this.handleUpVote.bind(this);
		this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote() {
    this.props.handleUpVote(this.props.id);
  }

  handleDownVote() {
    this.props.handleDownVote(this.props.id);
  }  

  render() {
    return (
      <li className="Joke">
        <b>Score: {this.props.score}</b>
        <button className="Joke-upBtn" onClick={this.handleUpVote}> Up </button>
        <button className="Joke-downBtn" onClick={this.handleDownVote}> Down </button>
        {this.props.joke}
        <br/>
      </li>
    );
  }
}

export default Joke;