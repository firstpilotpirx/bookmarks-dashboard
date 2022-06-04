import styled from 'styled-components';
import React, { useState } from 'react';

const CreateBookmarkControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
`;

const Url = styled.input`
  margin: 10px;
  text-align: center;
`;

const CreateButton = styled.button`
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

export interface CreateBookmarkControlProps {
  onClick: (url: string) => void;
}

export const CreateBookmarkControl = ({ onClick }: CreateBookmarkControlProps): JSX.Element => {
  const [urlValue, setUrlValue] = useState('');

  return (
    <CreateBookmarkControlContainer>
      <Url
        type="text"
        placeholder="https://www.google.com"
        value={urlValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setUrlValue(event.target.value)}
      />
      <CreateButton onClick={() => onClick(urlValue)}>Create</CreateButton>
    </CreateBookmarkControlContainer>
  );
};
