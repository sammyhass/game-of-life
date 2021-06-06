import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cell from './Cell';
import styles from './CellGrid.module.css';
import SpeedSelector from './SpeedSelector';

interface CellGridProps {
  rows?: number;
  cols?: number;
}
const CellGrid: React.FC<CellGridProps> = ({ rows = 20, cols = 20 }) => {
  const [livingCells, setLivingCells] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    if (!livingCells.length) setIsPlaying(false);
  }, [livingCells]);

  const toggleAliveCell = (i: number) => {
    if (livingCells.includes(i))
      setLivingCells(livingCells.filter(c => c !== i));
    else setLivingCells([...livingCells, i]);
  };

  const getLivingNeighbours = useCallback(
    (i: number) => {
      let numLivingNeighbours = 0;
      if (livingCells.includes(i - 1)) numLivingNeighbours++;
      if (livingCells.includes(i + 1)) numLivingNeighbours++;

      for (let x = i - (cols + 1); x <= i - (cols - 1); x++)
        if (livingCells.includes(x)) numLivingNeighbours++;

      for (let x = i + (cols - 1); x <= i + (cols + 1); x++)
        if (livingCells.includes(x)) numLivingNeighbours++;
      return numLivingNeighbours;
    },
    [livingCells]
  );
  const updateLivingCells = useCallback((): number[] => {
    // iterate through each living cell
    const updatedCells = [];
    for (let i = 0; i < livingCells.length; i++) {
      const numLivingNeighbours = getLivingNeighbours(livingCells[i]);
      if (numLivingNeighbours === 2 || numLivingNeighbours === 3)
        updatedCells.push(livingCells[i]);
    }

    // check dead cells
    for (let i = 0; i < cols * rows; i++) {
      if (livingCells.includes(i)) continue;
      let numLivingNeighbours = getLivingNeighbours(i);
      if (numLivingNeighbours === 3) updatedCells.push(i);
    }
    return updatedCells;
  }, [livingCells]);

  const interval = useRef<any>(-1);
  useEffect(() => {
    if (interval.current) clearInterval(interval.current);
    interval.current =
      isPlaying &&
      setInterval(() => {
        setLivingCells(updateLivingCells());
      }, speed);
  }, [isPlaying, speed, livingCells]);

  return (
    <div className={styles.grid}>
      <div className={styles.opts}>
        <div style={{ flex: 1 }}>
          <SpeedSelector
            title={'Generation Duration'}
            increment={100}
            onChange={setSpeed}
            value={speed}
            min={100}
            max={3000}
          />
        </div>
        <button
          className={styles.btn}
          style={{ background: '#f00', fontSize: '2em' }}
          onClick={() => setLivingCells([])}
        >
          Clear
        </button>
        <button
          className={[styles.btn, styles.pausePlayBtn].join(' ')}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <FontAwesomeIcon
            style={{ fontSize: '2em', marginLeft: '10px' }}
            icon={isPlaying ? faPause : faPlay}
          />
        </button>
      </div>
      <div className={styles.cellGrid}>
        {Array(cols * rows)
          .fill(0)
          .map((_, i) => (
            <Cell
              key={i}
              alive={livingCells.includes(i)}
              handleToggleLiving={() => toggleAliveCell(i)}
            />
          ))}
      </div>
    </div>
  );
};

export default CellGrid;
