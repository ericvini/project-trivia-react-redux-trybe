import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { hashRequest } from '../actions/index';
import GameScore from './GameScore';
import '../css/game.css'

class GameHeader extends React.Component {
  constructor() {
    super();

    this.convertToHash = this.convertToHash.bind(this);
  }

  componentDidMount() {
    this.convertToHash();
  }

  convertToHash() {
    const { email, hashAction } = this.props;
    const returnedHash = md5(email).toString();
    hashAction(returnedHash);
  }

  render() {
    const { name, assertions, hash } = this.props;
    const src = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div className='header'>
        <header>
        <img
          data-testid="header-profile-picture"
          src={ src }
          alt=""
        />
        <div className='score-name'>
        <span data-testid="header-player-name">{`nome ${ name}` }</span> 
        </div>      
        <div>
        <span data-testid="header-score">{ `acertos ${assertions}`}</span> 
        </div>
        <GameScore />       
             
      </header>
      </div>
      
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  hashAction: (returnedHash) => dispatch(hashRequest(returnedHash)),
});

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  assertions: state.game.assertions,
});

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  hash: PropTypes.string,
  hashAction: PropTypes.func.isRequired,
};

GameHeader.defaultProps = {
  hash: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(GameHeader);
