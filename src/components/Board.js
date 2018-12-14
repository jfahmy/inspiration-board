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
            ...card.card,
          };
          console.log(newCard)
          newCard.emoji === null ? newCard.emoji = "heart_eyes" : newCard.emoji
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

  addCard = (newCard) => {
    const apiPayload = {
      ...newCard
    };
    axios.post(URL, apiPayload)
      .then((response) => {
        const newCard = response.data.card;
        const list = this.state.cards;

        list.push(newCard);

        this.setState({
          cards: list
        })
        console.log(list)
      })
      .catch((error) => {
        this.setState({
          errorMessage: `Failure ${error.message}`,
        })
      });
  }

  deleteCard = (cardId) => {
    const deleteCall = 'https://inspiration-board.herokuapp.com/cards/' + cardId
    axios.delete(deleteCall)
      .then((response) => {
        console.log(response.data)
        let deleteIndex = -1
        const allCards = [...this.state.cards]

        allCards.forEach((card, index) => {
           if (cardId === card.id) {
             deleteIndex = index;
           }
        });

        allCards.splice(deleteIndex, 1)

        this.setState({
          cards: allCards
        })
   })
      .catch((error) => {
        this.setState({
          errorMessage: `Failure ${error.message}`
        })
      })

  }

  render() {
    console.log(this.state.cards)
    const allCards = this.state.cards
      .map((card, i) => {
        return (
          <Card
            key={i}
            id={card.id}
            text={card.text}
            emoji = {card.emoji}
            deleteCardCallback={this.deleteCard}
          />
        )
      })
    return (
      <div className="board">
        {allCards}
        <NewCardForm
          addCardCallback={this.addCard}/>
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
