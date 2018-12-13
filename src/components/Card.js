import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';


class Card extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.text)
    return (
      <div className="card">
        <div className="card__content">
        <h2 className="card__content-text"> {this.props.text} </h2>
        <p className="card__content-emoji">{emoji.getUnicode(this.props.emoji)}</p>
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  text: PropTypes.string
};

export default Card;
