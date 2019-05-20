import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import './Jokes.css';

class Jokes extends Component {
	constructor(props) {
		super(props);
		this.state = {
      jokes: [],
      isLoading: true
		};
		this.handleUpVote = this.handleUpVote.bind(this);
		this.handleDownVote = this.handleDownVote.bind(this);
	}

	async componentDidMount() {
		let response = await axios.get(`https://icanhazdadjoke.com/search?limit=10`, {
			headers: { Accept: 'application/json' }
		});
		let responseJokes = response.data.results;
    let jokes = responseJokes.map((joke) => ({ ...joke, score: 0 }));
    let isLoading = false;
		this.setState({ jokes, isLoading });
	}

	handleUpVote(id) {
		this.setState((st) => ({
			jokes: st.jokes.map((joke) => (joke.id === id ? { ...joke, score: (joke.score += 1) } : joke))
		}));
	}

	handleDownVote(id) {
		this.setState((st) => ({
			jokes: st.jokes.map((joke) => (joke.id === id ? { ...joke, score: (joke.score -= 1) } : joke))
		}));
	}

	render() {
    const { jokes } = this.state;
    jokes.sort((a, b) => (b.score - a.score))
    let data = (<ol>
      
      {jokes.map((joke) => (
        <Joke
          key={joke.id}
          id={joke.id}
          joke={joke.joke}
          handleUpVote={this.handleUpVote}
          handleDownVote={this.handleDownVote}
          score={joke.score}
        />
      ))}
    </ol>)
  if(this.state.isLoading) {
    data = <img src="./loading.gif" alt="loading"/>
  }
		return (
      
      <div className="Jokes">
        <h1>Parco's and Olivia's Jokes</h1>
        {data}
      </div>
		);
	}
}

export default Jokes;
