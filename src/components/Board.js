import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';


const URL = 'https://inspiration-board.herokuapp.com/boards/JackieFInspo/cards'

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
      }
  }


  componentDidMount() {
    axios.get(URL)
      .then((response) => {
        const cardSet = response.data.map((card) => {
          console.log(card)
          const newCard = {
            ...card.card
          };
          console.log(newCard)
          return newCard;
        })

        this.setState({
          cards: cardSet
        });

      })
      .catch((error) => {
        console.log(error.message);
        this.setState({
          errorMessage: error.message,
        });
      });
  }

  render() {
    console.log(this.state.cards)
    const allCards = this.state.cards
      .map((card, i) => {
        return (
          <Card
            key={i}
            id={i}
            text={card.text}
            emoji = {card.emoji}
          />
        )
      })
    return (
      <div className="board">
        {allCards}
      </div>
    )
  }

}

Board.propTypes = {
  cards: PropTypes.array,
  url: PropTypes.string,
  boardName: PropTypes.string
};

export default Board;
