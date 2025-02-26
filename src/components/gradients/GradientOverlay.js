import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

const GradientOverlay = ({ 
  colors, 
  locations = [0, 1], 
  start = { x: 0, y: 0 }, 
  end = { x: 0, y: 1 }, 
  style 
}) => {
  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={start}
      end={end}
      style={style}
    />
  );
};

GradientOverlay.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  locations: PropTypes.arrayOf(PropTypes.number),
  start: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  end: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

export default GradientOverlay;