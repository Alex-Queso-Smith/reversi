import React from 'react';

import Square from '../components/Square';

class Board extends React.Component {
  state = {}

  renderSquare = this.renderSquare.bind(this);

  renderSquare(i){
    const available = this.props.availableMoves.includes(i);

    return <Square
      key={i}
      available={  available }
      onClick={ available ? () => {this.props.clickTile(i)} : () => {} }
      stone={this.props.squares[i]}
    />
  }

  render(){
    const rows = [];

		for (var j = 0; j < 8; j++) {
			const tiles = [];

			for (var i = 0; i < 8; i++) {
				tiles.push(this.renderSquare(i + (j * 8)))
			}
			rows.push(<div className="board-row" key={j}>{tiles}</div>);
		}

    return(
      <div className="board">
        {rows}
      </div>
    )
  }
}

export default Board;
