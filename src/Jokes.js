import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';

class Jokes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			jokes: []
		};
		this.handleUpVote = this.handleUpVote.bind(this);
		this.handleDownVote = this.handleDownVote.bind(this);
	}

	async componentDidMount() {
		let response = await axios.get(`https://icanhazdadjoke.com/search?limit=10`, {
			headers: {
				'Accept': 'application/json'
			}
		});
		let responseJokes = response.data.results;
		let jokes = responseJokes.map((joke) => ({ ...joke, score: 0 }));
		this.setState({ jokes });
	}

	handleUpVote(id) {
    this.setState(st => ({
      jokes: st.jokes.map(joke => (joke.id === id ? {...joke, score: joke.score += 1} : joke))
    }));
  }  

	handleDownVote(id) {
    this.setState(st => ({
      jokes: st.jokes.map(joke => (joke.id === id ? {...joke, score: joke.score -= 1} : joke))
    }));
	}

	render() {
		const { jokes } = this.state;
		return (
			<div>
				Hello JOKE(S)
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
			</div>
		);
	}
}

export default Jokes;
