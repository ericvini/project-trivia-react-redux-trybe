import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStorage } from '../services';
import '../css/ranking.css'

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = getStorage('ranking');
    const numberNegative = -1;
    ranking.sort((a, b) => {
      if (a.score > b.score) {
        return numberNegative;
      }
      if (a.score < b.score) {
        return 1;
      }
      return 0;
    });
    return (
      <div className='ranking'>
        <h1 className ='title' data-testid="ranking-title">
          Ranking
        </h1>
        { ranking.map((element) => (
          <ol key={ element.name }>
            <ul>
              <img
                alt="gravatar-img"
                src={ element.picture }
              />
            </ul>
            <ul
              data-testid={ `player-name-${ranking.indexOf(element)}` }
            >
              {`nome ${element.name}`  }
            </ul>
            <ul
              data-testid={ `player-score-${ranking.indexOf(element)}` }
            >
              {`score ${element.score}`  }
            </ul>
          </ol>
        ))}
        <div className='button-tela-inicial'>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Voltar para tela inicial
        </button>
        </div>
       
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hash: state.game.hash,
});

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Ranking);
