import React, { useRef } from 'react';
import styles from './RippleEffect.module.css';

const RippleEffect = () => {
  const lineRef = useRef(null);

  const extendLine = () => {
    if (lineRef.current) {
      lineRef.current.style.height = '200vh'; // Extend the line
    }
  };

  return (
    <div className={styles.container} onMouseEnter={extendLine}>
      <div className={styles.centerCircle}></div>
      <div className={styles.ripple}></div>
      <div className={styles.line}></div>
    </div>
  );
};

export default RippleEffect;
