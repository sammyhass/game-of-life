import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cell from './Cell';
import styles from './CellGrid.module.css';

const CellGrid: React.FC = () => {
  const [livingCells, setLivingCells] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAliveCell = (i: number) => {
    if (livingCells.includes(i))
      setLivingCells(livingCells.filter(c => c !== i));
    else setLivingCells([...livingCells, i]);
  };

  const updateLivingCells = useCallback((): number[] => {
    // iterate through each living cell
    const updatedCells = [];
    for (let i = 0; i < livingCells.length; i++) {
      let numLivingNeighbours = 0;

      // check cells at cell-21 -> cell-19
      for (let x = livingCells[i] - 21; x <= livingCells[i] - 19; x++) {
        if (livingCells.includes(x)) numLivingNeighbours++;
      }

      // check cells at cell-1 and cell+1
      if (livingCells.includes(livingCells[i] - 1)) numLivingNeighbours++;
      if (livingCells.includes(livingCells[i] + 1)) numLivingNeighbours++;

      // check cells at cell+19 -> cell+21
      for (let x = livingCells[i] + 19; x <= livingCells[i] + 21; x++) {
        if (livingCells.includes(x)) numLivingNeighbours++;
      }

      if (numLivingNeighbours === 2 || numLivingNeighbours === 3)
        updatedCells.push(livingCells[i]);
    }

    // check dead cells
    for (let i = 0; i < 400; i++) {
      let numLivingNeighbours = 0;
      if (livingCells.includes(i)) continue;
      if (livingCells.includes(i - 1)) numLivingNeighbours++;
      if (livingCells.includes(i + 1)) numLivingNeighbours++;

      for (let x = i - 21; x <= i - 19; x++)
        if (livingCells.includes(x)) numLivingNeighbours++;

      for (let x = i + 19; x <= i + 21; x++)
        if (livingCells.includes(x)) numLivingNeighbours++;
      if (numLivingNeighbours === 3) updatedCells.push(i);
    }
    return updatedCells;
  }, [livingCells]);

  const interval = useRef<any>(-1);
  useEffect(() => {
    if (interval.current) clearInterval(interval.current);
    interval.current = setInterval(() => {
      isPlaying && setLivingCells(updateLivingCells());
    }, 1000);
  }, [isPlaying, livingCells]);

  return (
    <>
      <button className={styles.btn} onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? `Pause` : `Play`}
      </button>
      <div className={styles.cellGrid}>
        {Array(400)
          .fill(0)
          .map((_, i) => (
            <Cell
              key={i}
              alive={livingCells.includes(i)}
              handleToggleLiving={() => toggleAliveCell(i)}
            />
          ))}
      </div>
    </>
  );
};

export default CellGrid;
