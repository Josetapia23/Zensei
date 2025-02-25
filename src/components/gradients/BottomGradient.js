import React from 'react';
import GradientOverlay from './GradientOverlay';

const BottomGradient = ({ 
  height = '55%',
  colors = ['transparent', '#76B3E5'],
  locations = [0.1, 1]
}) => {
  return (
    <GradientOverlay
      colors={colors}
      locations={locations}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    />
  );
};

export default BottomGradient;