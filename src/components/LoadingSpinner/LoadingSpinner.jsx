import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Loader = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
     
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 4000); 

    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  
  if (!isVisible) return null;

  return (
    <StyledWrapper>
      <div className="container">
        <span />
        <span />
        <span />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f8fafc;
  z-index: 9999;
  
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    gap: 0.625em;
    transform: translate(-50%, -50%);
  }

  .container span {
    border-radius: 50%;
    height: 1.5em;
    width: 1.5em;
    position: relative;
  }

  .container span::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: inherit;
    height: inherit;
    width: inherit;
    background-color: inherit;
    animation: ripple 1.8s ease-out infinite;
    animation-delay: inherit;
    z-index: -1;
  }

  .container span:nth-of-type(1) {
    background-color: #84cdfa;
  }

  .container span:nth-of-type(2) {
    background-color: #5ad1cd;
    animation-delay: 0.2s;
  }

  .container span:nth-of-type(3) {
    background-color: #9b59b6;
    animation-delay: 0.4s;
  }

  @keyframes ripple {
    from {
      opacity: 1;
      transform: scale(0);
    }

    to {
      opacity: 0;
      transform: scale(3);
    }
  }
`;

export default Loader;