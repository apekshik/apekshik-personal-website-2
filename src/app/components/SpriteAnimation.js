"use client"
import React, { useState, useEffect } from 'react';
import '../styles/animation.css'; // Import your CSS file

const SpriteAnimation = ({ play }) => {
  const [playing, setPlaying] = useState(play);

  useEffect(() => {
    setPlaying(play);
  }, [play]);

  return (
    <div className={`sprite ${playing ? 'playing' : ''}`} />
  );
};

export default SpriteAnimation;

