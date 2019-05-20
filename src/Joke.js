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
        <i onClick={this.handleUpVote} class="far fa-arrow-alt-circle-up"></i>
        <b> {this.props.score} </b>
        <i onClick={this.handleDownVote} class="far fa-arrow-alt-circle-down"></i>
        <span> {this.props.joke}</span>
        <br/>
      </li>
    );
  }
}

export default Joke;