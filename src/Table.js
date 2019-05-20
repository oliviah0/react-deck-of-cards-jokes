import React, {Component} from "react";
import Card from "./Card";
import axios from "axios";
import uuid from "uuid/v4";


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckId: "",
      remaining: 52,
      drawnCards: []
    };
   
    this.drawCard = this.drawCard.bind(this);
  }

  async componentDidMount() {
    let response = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    let deckId = response.data.deck_id;
    this.setState({ deckId });
    
    this.timerId = setInterval( () => {
      if (this.state.remaining === 0) {
        clearInterval(this.timerId);
      } else {
        this.drawCard();
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  async drawCard() {
    let { deckId, drawnCards } = this.state;
    let response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    let currCard = {key: uuid(), image: response.data.cards[0].image};
    let remaining = response.data.remaining;
    drawnCards = [...drawnCards, currCard];

    this.setState({remaining, drawnCards });

  }

  render() {
    let {drawnCards} = this.state;
    return (
      <div>
        <button onClick={this.drawCard}>Draw Card</button>
        { drawnCards.map(card => (<Card key={card.key} card={card.image} />)) }
      </div>
    );
  }
}

export default Table;
