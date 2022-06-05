import styled from 'styled-components';

const CreateBookmarkWidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-item: center;

  height: 130px;
  width: 200px;

  height: ${9 * 15}px;
  width: ${16 * 15}px;

  margin: 0px;
`;

const CreateBookmarkWidgetBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;

  height: ${9 * 15}px;
  width: ${16 * 15}px;

  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(15px);

  color: white;
  text-transform: uppercase;
  font-weight: bold;

  cursor: pointer;

  overflow: hidden;
`;

export interface CreateBookmarkWidgetProps {
  children: JSX.Element[] | JSX.Element | string;
}

export const CreateBookmarkWidget = ({ children }: CreateBookmarkWidgetProps): JSX.Element => (
  <CreateBookmarkWidgetContainer>
    <CreateBookmarkWidgetBody>{children}</CreateBookmarkWidgetBody>
  </CreateBookmarkWidgetContainer>
);
