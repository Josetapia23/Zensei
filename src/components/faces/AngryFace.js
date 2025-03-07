// components/faces/AngryFace.js
import React from 'react';
import { Svg, Path, Mask, G } from 'react-native-svg';

const AngryFace = ({ size = 88, color = '#76B3E5' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 88 87" fill="none">
      {/* Máscara principal */}
      <Mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="88" height="87">
        <Path d="M87.04 0H0.952V86.088H87.04V0Z" fill="white"/>
      </Mask>
      
      <G mask="url(#mask0)">
        {/* Círculo blanco de fondo */}
        <Path 
          d="M43.996 81.685C22.689 81.685 5.355 64.351 5.355 43.044C5.355 21.737 22.689 4.404 43.996 4.404C65.303 4.404 82.636 21.737 82.636 43.044C82.636 64.351 65.303 81.685 43.996 81.685Z" 
          fill="white"
        />
        
        {/* Borde azul */}
        <Path 
          d="M43.996 8.813C62.905 8.813 78.227 24.14 78.227 43.044C78.227 61.948 62.9 77.275 43.996 77.275C25.092 77.275 9.764 61.954 9.764 43.044C9.764 24.134 25.092 8.813 43.996 8.813ZM43.996 0C32.499 0 21.686 4.475 13.556 12.61C5.427 20.739 0.952 31.547 0.952 43.044C0.952 54.541 5.427 65.354 13.562 73.484C21.691 81.613 32.499 86.094 44.001 86.094C55.504 86.094 66.311 81.618 74.441 73.484C82.57 65.354 87.051 54.541 87.051 43.044C87.051 31.547 82.575 20.734 74.441 12.605C66.306 4.475 55.493 0 43.996 0Z" 
          fill={color}
        />
        
        {/* Boca de enojo */}
        <Path 
          d="M60.199 46.296C61.61 46.296 62.52 51.421 62.128 53.185C60.525 60.372 60.017 60.625 52.373 60.625C44.728 60.625 31.38 61.474 29.776 54.287C29.385 52.523 29.644 48.456 31.055 48.456L58.259 46.296H60.199Z" 
          fill={color}
        />
      </G>

      {/* Efectos de brillo */}
      <Mask id="mask1" maskUnits="userSpaceOnUse" x="0" y="0" width="88" height="87">
        <Path d="M87.04 0.551H0.952V86.639H87.04V0.551Z" fill="white"/>
      </Mask>
      
      <G mask="url(#mask1)" opacity="0.62">
        {/* Brillo en la boca */}
        <G opacity="0.62">
          <Mask id="mask2" maskUnits="userSpaceOnUse" x="42" y="54" width="24" height="19">
            <Path d="M65.435 54.012H42.287V72.199H65.435V54.012Z" fill="white"/>
          </Mask>
          
          <G mask="url(#mask2)">
            <Mask id="mask3" maskUnits="userSpaceOnUse" x="42" y="54" width="24" height="19">
              <Path d="M65.016 54.381H42.684V72.176H65.016V54.381Z" fill="white"/>
            </Mask>
            
            <G mask="url(#mask3)">
              <Path 
                d="M65.011 63.281C65.011 68.198 60.012 72.176 53.845 72.176C47.677 72.176 42.678 68.192 42.678 63.281C42.678 58.371 47.677 54.387 53.845 54.387C60.012 54.387 65.011 58.371 65.011 63.281Z" 
                fill="white"
              />
            </G>
          </G>
        </G>

        {/* Brillo en los ojos */}
        <G opacity="0.62">
          <Mask id="mask4" maskUnits="userSpaceOnUse" x="26" y="35" width="39" height="18">
            <Path d="M64.884 35.824H26.304V52.909H64.884V35.824Z" fill="white"/>
          </Mask>
          
          <G mask="url(#mask4)">
            <Mask id="mask5" maskUnits="userSpaceOnUse" x="29" y="36" width="34" height="18">
              <Path d="M62.812 36.375H29.611V53.113H62.812V36.375Z" fill="white"/>
            </Mask>
            
            <G mask="url(#mask5)">
              <Path 
                d="M64.333 43.265C64.333 47.987 56.438 51.807 46.697 51.807C36.956 51.807 29.06 47.981 29.06 43.265C29.06 38.548 36.956 34.722 46.697 34.722C56.438 34.722 64.333 38.548 64.333 43.265Z" 
                fill="white"
              />
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default AngryFace;