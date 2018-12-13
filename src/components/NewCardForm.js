import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';


class NewCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      emoji: ''
    };
  }

  resetState = () => {
    this.setState({
      text: '',
      emoji: ''
    });
  }

  onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    const updatedState = {};
    updatedState[field] = value;
    console.log(updatedState)
    this.setState(updatedState)
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { text, emoji } = this.state;

    if (text === '' || emoji === '') return;

    console.log(event);
    this.props.addCardCallback(this.state);
    this.resetState();
  }

  render() {
    const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

    const emojiDropDown = EMOJI_LIST.map((item, i) => {
      return (
        <option key={i} value={item}>{emoji.getUnicode(item)}</option>
      )
    })

    return (
      <section className="new-card-form">
      <h1 className="new-card-form__header"> Create new card </h1>
          <form onSubmit={this.onSubmit} name="new-card-form__form" id="new-card-form" className="new-card-form">
            <div>
              <label className=".new-card-form__form-label" htmlFor="text">Message</label>
              <textarea className="new-card-form__form-textarea" name="text" onChange={this.onFormChange} value={this.state.text}></textarea>

            </div>
            <div>
              <label className=".new-card-form__form-label" htmlFor="emoji">Emoji
                <select className= "new-card-form__form-select" name="emoji" value={this.state.emoji} onChange={this.onFormChange}>
                  {emojiDropDown}
                </select>
              </label>

            </div>
            <input className="btn btn-success new-card-form__form-button" type="submit" name="submit"
            value="Add Card" />
          </form>
      </section>
    )
  }

}



export default NewCardForm;
