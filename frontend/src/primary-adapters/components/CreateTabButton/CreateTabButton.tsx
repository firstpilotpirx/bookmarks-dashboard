import styled from 'styled-components';
import { BaseTabButton } from '../TabButton/TabButton';

export const CreateTabButtonContainer = styled.div`
  ${BaseTabButton};

  padding-left: 19px;
  padding-right: 19px;

  color: white;

  cursor: pointer;

  overflow: hidden;

  content: 'whatever it is you want to add';
`;

export interface CreateTabButtonProps {
  onClick: () => void;
}

export const CreateTabButton = ({ onClick }: CreateTabButtonProps): JSX.Element => (
  <CreateTabButtonContainer onClick={onClick}>+</CreateTabButtonContainer>
);
