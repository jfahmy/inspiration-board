import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';


class Card extends Component {

  constructor(props) {
    super(props);

  }

  onDeleteClick = () => {
    console.log(this.props)
    this.props.deleteCardCallback(this.props.id)
  }

  render() {
    return (
      <div className="card">
        <div className="card__content">
          <h2 className="card__content-text"> {this.props.text} </h2>
          <p className="card__content-emoji">{emoji.getUnicode(this.props.emoji)}</p>
        </div>
        <div onClick={this.onDeleteClick} className="card__delete"> X </div>
      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  emoji: PropTypes.string,
  deleteCardCallback: PropTypes.function
};

export default Card;
