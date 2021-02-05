import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components';

const CorrectWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Correct() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      render: 'svg',
      loop: false,
      autoplay: true,
      animationData: require('./782-check-mark-success.json'),
    });
  }, []);

  return (
    <CorrectWrapper>
      <div className="container" ref={container}></div>
    </CorrectWrapper>
  );
}
