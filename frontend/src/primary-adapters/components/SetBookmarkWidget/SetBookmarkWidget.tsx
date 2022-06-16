import styled from 'styled-components';
import { useRef, useState } from 'react';
import { SmallSpinner } from '../SmallSpinner/SmallSpinner';

const SetBookmarkWidgetRootContainer = styled.div`
  height: 100%;
  width: 100%;

  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(15px);

  color: white;
  text-transform: uppercase;
  font-weight: bold;

  cursor: pointer;

  overflow: hidden;
`;

const SetBookmarkWidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  cursor: pointer;

  overflow: hidden;
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

  border-style: solid;
  text-align: center;

  background-color: rgba(0, 82, 204, 200);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px;
  //box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(15px);

  &:hover {
    background-color: #014ab8;
  }

  &:active {
    background-color: #0042a3;
  }
`;

const BookmarkPagePreviewSpinnerContainer = styled.a`
  display: flex;

  justify-content: center;
  align-items: center;

  height: 100%;
`;

export interface SetBookmarkWidgetProps {
  onClickSetBookmark: (url: string, name: string) => void;
}

export const SetBookmarkWidget = ({ onClickSetBookmark }: SetBookmarkWidgetProps): JSX.Element => {
  const nameInput = useRef(null);
  const [urlValue, setUrlValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleUrlKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      // @ts-ignore
      nameInput?.current?.focus();
    }
  };

  const handleNameKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      setIsCreating(true);
      onClickSetBookmark(urlValue, nameValue);
    }
  };

  return (
    <SetBookmarkWidgetRootContainer>
      {isCreating ? (
        <BookmarkPagePreviewSpinnerContainer>
          <SmallSpinner />
        </BookmarkPagePreviewSpinnerContainer>
      ) : (
        <SetBookmarkWidgetContainer>
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
          <CreateButton
            onClick={() => {
              setIsCreating(true);
              onClickSetBookmark(urlValue, nameValue);
            }}
          >
            Create
          </CreateButton>
        </SetBookmarkWidgetContainer>
      )}
    </SetBookmarkWidgetRootContainer>
  );
};
