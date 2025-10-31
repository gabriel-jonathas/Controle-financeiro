
import React from 'react';

interface BalanceFaceProps {
  balance: number;
}

const BalanceFace: React.FC<BalanceFaceProps> = ({ balance }) => {
  let faceColor = 'text-yellow-400';
  let FaceComponent;

  if (balance > 50) {
    faceColor = 'text-secondary';
    FaceComponent = (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M9 10l.01 0"></path>
        <path d="M15 10l.01 0"></path>
        <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
      </svg>
    );
  } else if (balance < -50) {
    faceColor = 'text-danger';
    FaceComponent = (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M9 10l.01 0"></path>
        <path d="M15 10l.01 0"></path>
        <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0"></path>
      </svg>
    );
  } else {
    faceColor = 'text-blue-400';
    FaceComponent = (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M9 10l.01 0"></path>
        <path d="M15 10l.01 0"></path>
        <path d="M9 15l6 0"></path>
      </svg>
    );
  }

  return (
    <div className={`transition-colors duration-500 ${faceColor}`}>
      {FaceComponent}
    </div>
  );
};

export default BalanceFace;
