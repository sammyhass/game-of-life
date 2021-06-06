import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './SpeedSelector.module.css';

interface SpeedSelectorProps {
  value: number;
  onChange: (value: number) => void;
  increment: number;
  title?: string;
  min: number;
  max: number;
}

const SpeedSelector: React.FC<SpeedSelectorProps> = ({
  value,
  onChange,
  increment = 100,
  title,
  min,
  max,
}) => {
  // length in ms per generation

  return (
    <div className={styles.container}>
      <b className={styles.title}>{title}</b>
      <div className={styles.selector}>
        <span
          className={styles.control}
          style={{ opacity: value - increment >= min ? 1 : 0.4 }}
          onClick={() =>
            value - increment >= min ? onChange(value - increment) : null
          }
        >
          <FontAwesomeIcon icon={faMinus} />
        </span>
        <span className={styles.valueDisplay}>{value}ms</span>
        <span
          className={styles.control}
          style={{ opacity: value + increment <= max ? 1 : 0.4 }}
          onClick={() =>
            value + increment <= max ? onChange(value + increment) : null
          }
        >
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </div>
    </div>
  );
};

export default SpeedSelector;
