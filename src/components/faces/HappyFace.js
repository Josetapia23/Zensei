import React from 'react';
import { Svg, Path, Mask, G } from 'react-native-svg';

const HappyFace = ({ size = 87 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 87 87" fill="none">
      {/* Máscara principal */}
      <Mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="87" height="87">
        <Path d="M86.088 0H0V86.088H86.088V0Z" fill="white"/>
      </Mask>
      
      <G mask="url(#mask0)">
        {/* Círculo blanco de fondo */}
        <Path 
          d="M43.0441 81.6845C21.737 81.6845 4.40369 64.3511 4.40369 43.0441C4.40369 21.737 21.737 4.40369 43.0441 4.40369C64.3511 4.40369 81.6845 21.737 81.6845 43.0441C81.6845 64.3511 64.3511 81.6845 43.0441 81.6845Z" 
          fill="white"
        />
        
        {/* Borde azul */}
        <Path 
          d="M43.044 8.81272C61.9536 8.81272 77.2753 24.1399 77.2753 43.044C77.2753 61.9481 61.9481 77.2753 43.044 77.2753C24.1399 77.2753 8.81272 61.9536 8.81272 43.044C8.81272 24.1344 24.1399 8.81272 43.044 8.81272ZM43.044 0C31.5472 0 20.7394 4.47525 12.6046 12.6101C4.47525 20.7394 0 31.5472 0 43.044C0 54.5408 4.47525 65.3541 12.6101 73.4835C20.7394 81.6128 31.5472 86.0935 43.0495 86.0935C54.5518 86.0935 65.3596 81.6183 73.489 73.4835C81.6183 65.3541 86.099 54.5408 86.099 43.044C86.099 31.5472 81.6238 20.7339 73.489 12.6046C65.3541 4.47525 54.5408 0 43.044 0Z" 
          fill="#76B3E5"
        />
        
        {/* Boca principal */}
        <Path 
          d="M58.4816 49.6246C58.4816 58.1067 51.438 64.9849 42.7465 64.9849C34.055 64.9849 27.0115 58.1067 27.0115 49.6246C27.0115 49.6246 32.6662 52.6449 42.7741 52.8653C54.3094 53.1189 58.4816 49.6246 58.4816 49.6246Z" 
          fill="#76B3E5"
        />
      </G>

      {/* Efecto de brillo en la boca */}
      <Mask id="mask1" maskUnits="userSpaceOnUse" x="0" y="0" width="87" height="87">
        <Path d="M86.088 0H0V86.088H86.088V0Z" fill="white"/>
      </Mask>
      
      <G mask="url(#mask1)" opacity="0.62">
        <Mask id="mask2" maskUnits="userSpaceOnUse" x="32" y="54" width="24" height="18">
          <Path d="M55.6264 54.5077H32.4785V71.593H55.6264V54.5077Z" fill="white"/>
        </Mask>
        
        <G mask="url(#mask2)">
          <Mask id="mask3" maskUnits="userSpaceOnUse" x="32" y="54" width="24" height="18">
            <Path d="M55.2406 54.866H32.9084V71.582H55.2406V54.866Z" fill="white"/>
          </Mask>
          
          <G mask="url(#mask3)">
            <Path 
              d="M55.2355 63.2269C55.2355 67.8454 50.2367 71.5821 44.0694 71.5821C37.9022 71.5821 32.9033 67.8399 32.9033 63.2269C32.9033 58.6138 37.9022 54.8716 44.0694 54.8716C50.2367 54.8716 55.2355 58.6138 55.2355 63.2269Z" 
              fill="white"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default HappyFace;