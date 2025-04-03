import React from "react";
import "./LoginButton.css";

export default function LoginButton({ onClick, text }) {
  return (
    <div className="fancy-button" onClick={onClick}>
      <div className="fancy-flipper">
        <div className="fancy-front">
          <svg height="100" width="250" viewBox="0 0 250 100">
            <defs>
              <mask id="mask_1">
                <rect width="100%" height="100%" fill="#FFFFFF" />
                <text className="mask-text button-text" fill="#000000"
                      x="50%" y="60%" textAnchor="middle"
                      fontFamily="'Futura', sans-serif"
                      fontSize="30">{text}</text>
              </mask>
            </defs>
            <rect fill="#000000" width="100%" height="100%" mask="url(#mask_1)" />
          </svg>
        </div>
        <div className="fancy-back">
          <svg height="100" width="250" viewBox="0 0 250 100">
            <rect stroke="#000000" strokeWidth="5" fill="transparent" width="100%" height="100%" />
            <text className="button-text" x="50%" y="60%" textAnchor="middle"
                  fontFamily="'Futura', sans-serif"
                  fontSize="30" fill="#000000">{text}</text>
          </svg>
        </div>
      </div>
    </div>
  );
}