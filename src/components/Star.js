import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
export default function Star({ onStarClicked, isStarred }) {
  return (
    <button onClick={onStarClicked}>
      <FontAwesomeIcon icon={isStarred ? faStarSolid : faStarRegular} />
    </button>
  );
}
