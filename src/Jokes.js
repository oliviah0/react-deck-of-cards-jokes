import React, {Component} from "react";
import Joke from "./Joke";

class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hello JOKE(S)
        <Joke />
      </div>
    );
  }
}

export default Jokes;