import styled from 'styled-components';
import { Spinner } from '../Spinner/Spinner';

export const FullScreenSpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  backdrop-filter: blur(5rem);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullScreenSpinner = (): JSX.Element => (
  <FullScreenSpinnerContainer>
    <Spinner />
  </FullScreenSpinnerContainer>
);
