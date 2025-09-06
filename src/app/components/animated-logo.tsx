"use client";

import React from "react";

interface AnimatedLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function AnimatedLogo({ 
  width = 300, 
  height = 300, 
  className = "" 
}: AnimatedLogoProps) {
  return (
    <div className={`inline-block ${className}`} style={{ overflow: 'visible' }}>
      <style jsx>{`
        @keyframes rotateClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotateCounterClockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        .rotate-cw-20 {
          animation: rotateClockwise 20s linear infinite;
          transform-origin: 200px 200px;
        }
        
        .rotate-ccw-18 {
          animation: rotateCounterClockwise 18s linear infinite;
          transform-origin: 200px 200px;
        }
        
        .rotate-cw-25 {
          animation: rotateClockwise 25s linear infinite;
          transform-origin: 200px 200px;
        }
        
        .rotate-ccw-16 {
          animation: rotateCounterClockwise 16s linear infinite;
          transform-origin: 200px 200px;
        }
        
        .rotate-cw-30 {
          animation: rotateClockwise 30s linear infinite;
          transform-origin: 200px 200px;
        }
        
        .rotate-ccw-22 {
          animation: rotateCounterClockwise 22s linear infinite;
          transform-origin: 200px 200px;
        }
        
        .rotate-cw-28 {
          animation: rotateClockwise 28s linear infinite;
          transform-origin: 200px 200px;
        }
        
        .rotate-ccw-12 {
          animation: rotateCounterClockwise 12s linear infinite;
          transform-origin: 200px 200px;
        }
        
        .rotate-cw-35 {
          animation: rotateClockwise 35s linear infinite;
          transform-origin: 200px 200px;
        }
        
        .rotate-ccw-40 {
          animation: rotateCounterClockwise 40s linear infinite;
          transform-origin: 200px 200px;
        }
      `}</style>
      
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        <g transform="translate(13, 47.5)">
        {/* Layer 1 - Innermost */}
        <path 
          d="M81 182C114.333 78 149.667 42.6667 187 76C224.333 109.333 259.667 144.667 293 182C259.667 219.333 224.333 254.667 187 288C149.667 254.667 114.333 219.333 81 182Z" 
          stroke="white" 
          strokeOpacity="0.19" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          className="rotate-cw-20"
        />
        
        {/* Layer 2 */}
        <path 
          d="M111 182C161.667 91.3333 212.333 91.3333 263 182C212.333 272.667 161.667 272.667 111 182Z" 
          stroke="white" 
          strokeOpacity="0.19" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          className="rotate-ccw-18"
        />
        
        {/* Layer 3 */}
        <path 
          d="M61 126C145 46 229 46 313 126C229 272.667 145 272.667 61 126Z" 
          stroke="white" 
          strokeOpacity="0.19" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          className="rotate-cw-25"
        />
        
        {/* Layer 4 */}
        <path 
          d="M91 86C155 19.3333 219 19.3333 283 86C219 280.667 155 280.667 91 86Z" 
          stroke="white" 
          strokeOpacity="0.19" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          className="rotate-ccw-16"
        />
        
        {/* Layer 5 */}
        <path 
          d="M131 26C168.333 -7.33333 205.667 -7.33333 243 26C205.667 267.333 168.333 267.333 131 26Z" 
          stroke="white" 
          strokeOpacity="0.19" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          className="rotate-cw-30"
        />
        
        {/* Layer 6 */}
        <path 
          d="M111 226C161.667 252.667 212.333 252.667 263 226C212.333 72.6667 161.667 72.6667 111 226Z" 
          stroke="white" 
          strokeOpacity="0.19" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          className="rotate-ccw-22"
        />
        
        {/* Layer 7 */}
        <path 
          d="M61 236C145 296 229 296 313 236C229 104 145 104 61 236Z" 
          stroke="white" 
          strokeOpacity="0.19" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          className="rotate-cw-28"
        />
        
        {/* Layer 8 */}
        <path 
          d="M41 182C138.333 318 235.667 318 333 182C235.667 46 138.333 46 41 182Z" 
          stroke="white" 
          strokeOpacity="0.19" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          className="rotate-ccw-12"
        />
        
        {/* Layer 9 */}
        <path 
          d="M21 182C131.667 331.333 242.333 331.333 353 182C242.333 32.6667 131.667 32.6667 21 182Z" 
          stroke="white" 
          strokeOpacity="0.19" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          className="rotate-cw-35"
        />
        
        {/* Layer 10 - Outermost */}
        <path 
          d="M1 182C125 344.667 249 344.667 373 182C249 19.3333 125 19.3333 1 182Z" 
          stroke="white" 
          strokeOpacity="0.19" 
          strokeWidth="1.2" 
          strokeLinecap="round"
          className="rotate-ccw-40"
        />
        </g>
      </svg>
    </div>
  );
}
