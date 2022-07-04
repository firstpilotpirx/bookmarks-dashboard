import styled from 'styled-components';

export const TabBar = styled.div`
  padding-top: 0;
  padding-bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0 0;

  background-color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(15px);

  color: white;
  text-transform: uppercase;
  font-weight: bold;

  cursor: auto;

  overflow: hidden;
`;
