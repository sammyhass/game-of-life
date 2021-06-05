import React from 'react';
import styles from './Cell.module.css';

interface CellProps {
  handleToggleLiving: () => void;
  alive: boolean;
}

const Cell: React.FC<CellProps> = ({ alive, handleToggleLiving }) => {
  return (
    <div
      className={styles.cell}
      style={{ background: alive ? '#000' : '#fff' }}
      onClick={handleToggleLiving}
    ></div>
  );
};

export default Cell;
