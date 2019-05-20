import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import './Jokes.css';
import { NONAME } from 'dns';

class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes')) || [],
      isLoading: true
    };
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.getJokes = this.getJokes.bind(this);
  }

  async componentDidMount() {
    if (this.state.jokes.length === 0) return await this.getJokes();
    this.setState({isLoading: false});
  }

  componentDidUpdate() {
    window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
  }
	
  async getJokes() {
    let page = Math.floor(Math.random() * 56);
    let response = await axios.get(
      `https://icanhazdadjoke.com/search?limit=10&page=${page}`, { 
        headers: { Accept: 'application/json' }
      });
    let responseJokes = response.data.results;
    let jokes = responseJokes.map((joke) => ({ ...joke, score: 0 }));
    let isLoading = false;
    this.setState({ jokes, isLoading });
    // window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
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
    jokes.sort((a, b) => (b.score - a.score));
		
    let data = (
      <ul>
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
      </ul>
    );
    if(this.state.isLoading) {
      data = <img src="./loading.gif" alt="loading"/>
    }
    return (
      
      <div className="Jokes">
        <h1>Parco's and Olivia's Jokes</h1>
        {data}
        <button onClick={this.getJokes}>Generate New Joke List</button>
      </div>
    );
  }
}

export default Jokes;
