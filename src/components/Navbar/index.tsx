import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <div className={styles.Navbar}>
      <div className={styles.title}>Conway's Game of Life</div>
      <div className={styles.links}>
        <a href={'https://github.com/sammyhass/game-of-life'}>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
