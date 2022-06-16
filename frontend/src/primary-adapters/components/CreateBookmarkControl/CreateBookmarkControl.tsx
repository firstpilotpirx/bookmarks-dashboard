import styled from 'styled-components';
import React, { useRef, useState } from 'react';

const CreateBookmarkControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
`;

const Name = styled.input`
  margin: 10px;
  padding: 0.2em;
  padding-left: 0.5em;
  padding-right: 0.5em;

  text-align: left;
`;

const Url = styled.input`
  margin: 10px;
  padding: 0.2em;
  padding-left: 0.5em;
  padding-right: 0.5em;

  text-align: left;
`;

const CreateButton = styled.button`
  margin: 10px;
  padding: 10px;

  border-radius: 5px;
  border-style: solid;
  text-align: center;

  background-color: rgba(0, 82, 204, 200);
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px
  //box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.9);
  box-shadow: none;
  backdrop-filter: blur(15px);

  user-select: none;

  &:hover {
    background-color: #014ab8;
  }

  &:active {
    background-color: #0042a3;
  }
`;

export interface CreateBookmarkControlProps {
  onClickCreateBookmark: (url: string, name: string) => void;
}

export const CreateBookmarkControl = ({ onClickCreateBookmark }: CreateBookmarkControlProps): JSX.Element => {
  const nameInput = useRef(null);
  const [urlValue, setUrlValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  const handleUrlKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      // @ts-ignore
      nameInput?.current?.focus();
    }
  };

  const handleNameKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onClickCreateBookmark(urlValue, nameValue);
    }
  };

  return (
    <CreateBookmarkControlContainer>
      <Url
        type="text"
        placeholder="https://www.google.com"
        value={urlValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setUrlValue(event.target.value)}
        onKeyDown={handleUrlKeyPress}
      />
      <Name
        type="text"
        placeholder="google"
        value={nameValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setNameValue(event.target.value)}
        ref={nameInput}
        onKeyDown={handleNameKeyPress}
      />
      <CreateButton onClick={() => onClickCreateBookmark(urlValue, nameValue)}>Create</CreateButton>
    </CreateBookmarkControlContainer>
  );
};
