import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Widget from '../Widget';
import lottie from 'lottie-web';

const LoadingWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoadingWidget() {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      render: 'svg',
      loop: false,
      autoplay: true,
      animationData: require('./27-loading.json'),
    });
  }, []);

  return (
    <Widget>
      <Widget.Content>
        <LoadingWrapper>
          <div className="container" ref={container}></div>
        </LoadingWrapper>
      </Widget.Content>
    </Widget>
  );
}
