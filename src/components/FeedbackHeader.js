import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameScore from './GameScore';
import '../css/feedback.css'

class FeedbackHeader extends React.Component {
  render() {
    const { name, hash, assertions } = this.props;
    const src = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div className='feedback'>
        <header>
        <img data-testid="header-profile-picture" alt="" src={ src } />
        <div>
        <span data-testid="header-player-name">{`nome ${name}`}</span>       
        </div>        
        <div>
        <span data-testid="header-score">{ `acertos ${assertions}` }</span>
        </div>
        <GameScore />
      </header>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  hash: state.game.hash,
  name: state.login.name,
  assertions: state.game.assertions,
});

FeedbackHeader.propTypes = {
  hash: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedbackHeader);
