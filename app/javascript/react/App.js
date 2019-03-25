import React from 'react';

import Board from './containers/Board';

class App extends React.Component {
  state = {
    squares: [],
    whitesTurn: true
  }

  checkForMoves = this.checkForMoves.bind(this);
  handleClick = this.handleClick.bind(this);
  newGame = this.newGame.bind(this);

  componentDidMount(){
    this.newGame();
  }

  newGame(){
    const newGame = Array(64).fill(null);
    newGame[27] = "white";
    newGame[28] = "black";
    newGame[35] = "black";
    newGame[36] = "white";

    this.setState({
      squares: newGame,
      whiteTurn: true
    })
  }

  handleClick(i){
    const { whitesTurn, squares } = this.state;

    var newBoard = squares;

    newBoard[i] = whitesTurn ? "white" : "black";

    var startX = i % 8;
    var startY = (i - i % 8) / 8;

    [1, 7, 8, 9, -1, -7, -8, -9].forEach(shift => {
      var currentX = startX;
      var currentY = startY;

      var validRow = false;
      var tempBoard = newBoard.slice(0);

      for (var j = i + shift; j < 64; j = j + shift) {

        var x = j % 8;
        var y = (j - j % 8) / 8;

        if (tempBoard[j] === null || j < 0) { break; }

        if (Math.abs(currentX - x) > 1 || Math.abs(currentY - y) > 1) { break; }

        if (
          whitesTurn && tempBoard[j] === "black" ||
          !whitesTurn && tempBoard[j] === "white"
        ) {
          tempBoard[j] = whitesTurn ? "white" : "black";
          currentX = x;
          currentY = y;
          validRow = true;
          continue;
        }

        if (
          whitesTurn && validRow && tempBoard[j] === "white" ||
          !whitesTurn && validRow && tempBoard[j] === "black"
        ) {
          newBoard = tempBoard.slice(0);
        }
        break;
      }
    })

    this.setState({
      squares: newBoard,
      whitesTurn: !whitesTurn
    })
  }

  checkForMoves(whitesTurn) {

    const { squares } = this.state;

		var availableMoves = [];

    squares.forEach( (square, index) => {
      var startX = index % 8;
      var startY = (index - index % 8) / 8;

      if (squares[index] === null) {
        [1, 7, 8, 9, -1, -7, -8, -9].forEach((shift) => {

          var currentX = startX;
          var currentY = startY;

          let valid = false;
          let opposite = false;

          for (var i = index + shift; i < 64; i = i + shift) {

            var x = i % 8;
            var y = (i - i % 8) / 8;

            // break if square contains stone
            if (squares[i] === null) { break; }

            // break if index becomes negative
            if (i < 0) { break; }

            // break if check reaches end of row
            if (Math.abs(currentX - x) > 1 || Math.abs(currentY - y) > 1) { break; }

            // break edge case row contains opposite stone but no "sandwich" stones
            if (
              whitesTurn && squares[i] === "white" && !opposite ||
              !whitesTurn && squares[i] === "black" && !opposite
            ) {
              break;
            }

            // find possible available row for move starting in opposite color
            if (whitesTurn && squares[i] === "black" || !whitesTurn && squares[i] === "white") {
              opposite = true;
            }

            // find possible row ends in same color
            if (
              opposite && squares[i] === "white" && whitesTurn ||
              opposite && squares[i] === "black" && !whitesTurn
            ) {
              valid = true;
            }

            currentX = x;
            currentY = y;
          }
          if (valid) {
            availableMoves.push(index);
          }
        });
      }
    })

    return availableMoves;
	}

  render(){
    const { whitesTurn, squares } = this.state;

    const availableMoves = this.checkForMoves(whitesTurn);
    const availableMovesOpposite = this.checkForMoves(!whitesTurn);
    const whiteCount = this.state.squares.filter(square => square === "white").length;
    const blackCount = this.state.squares.filter(square => square === "black").length;
    const remainingMoves = this.state.squares.filter(square => square === null).length;

    var winner;
    if (availableMoves.length === 0 && availableMovesOpposite.length === 0 || remainingMoves === 0) {
      winner = <div>
        <div className="game-info">Winner: {whiteCount > blackCount ? "white" : whiteCount === blackCount ? "tie!" : "black"}</div>
        <br />
    </div>
    }

    return(
      <div className="game-wrapper">
        <h2>Reversi</h2>
        <div className="game-info">{this.state.whitesTurn ? "White" : "Black"} Turn</div>
        <br />
        <div className="game-info">White: {whiteCount}</div>
        <div className="game-info">Black: {blackCount}</div>
        <br />
        {winner}
        <Board
          squares={ this.state.squares }
          availableMoves={ availableMoves }
          clickTile={ (i) => { this.handleClick(i)} }
        />
        <br />
        <button className="new-game-button" onClick={this.newGame}>New Game</button>
      </div>
    )
  }
}

export default App;
