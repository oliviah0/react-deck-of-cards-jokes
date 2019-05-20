import React, {Component} from "react";

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
      <li>
        {this.props.joke}
        <br/>
        <button onClick={this.handleUpVote}> Up </button>
        <button onClick={this.handleDownVote}> Down </button>
        <p>{this.props.score}</p>
      </li>
    );
  }
}

export default Joke;