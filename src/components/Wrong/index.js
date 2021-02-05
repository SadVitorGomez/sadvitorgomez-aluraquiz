import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components';

const WrongWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Wrong() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      render: 'svg',
      loop: false,
      autoplay: true,
      animationData: require('./41791-loading-wrong.json'),
    });
  }, []);

  return (
    <WrongWrapper>
      <div className="container" ref={container}></div>
    </WrongWrapper>
  );
}
