import React from 'react';

const Square = props => {

  var squareClass = `square`;
  if (props.available) {
    squareClass = 'square available'
  }

  var stone;

  switch (props.stone) {
    case "white":
      stone = <div className="white stone"  />
      break;
    case "black":
      stone = <div className="black stone"/>
      break;
  }

  return(
    <div className={squareClass} onClick={props.onClick}>
      {stone}
    </div>
  );
};

export default Square;
