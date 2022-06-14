import styled from 'styled-components';
import { useState } from 'react';
import { SmallSpinner } from '../SmallSpinner/SmallSpinner';

const BookmarkWidgetContainer = styled.div`
  margin: 0;
  padding: 0;

  height: 100%;
  width: 100%;

  background-color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.9);

  color: white;
  text-transform: uppercase;
  font-weight: bold;

  cursor: pointer;

  overflow: hidden;
`;

const BookmarkPreviewTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 0.4em;
  padding-right: 0.4em;
  height: 1.6em;
  background-color: #000000;

  overflow: hidden;
`;

const RoundButtonSize = 0.6;

const ButtonRed = styled.div`
  width: ${RoundButtonSize}em;
  height: ${RoundButtonSize}em;
  width: 10px;
  height: 10px;
  font-size: 0.8em;
  text-align: center;
  color: black;

  border-radius: 50%;

  background-color: #fe5f58;

  &:hover {
    background-color: #ff190dff;
  }
`;

const ButtonYellow = styled.div`
  width: ${RoundButtonSize}em;
  height: ${RoundButtonSize}em;
  border-radius: 50%;

  background-color: #febc30;

  &:hover {
    background-color: #fff900ff;
  }
`;

const ButtonGreen = styled.div`
  width: ${RoundButtonSize}em;
  height: ${RoundButtonSize}em;
  border-radius: 50%;

  background-color: #24c840;

  &:hover {
    background-color: #00ff2d;
  }
`;

const ButtonTransparent = styled.div`
  width: ${RoundButtonSize}em;
  height: ${RoundButtonSize}em;
  border-radius: 50%;
`;

const ButtonPlus = styled.div`
  width: ${RoundButtonSize}em;
  color: white;
  font-size: 70%;
  text-align: center;
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.2em;
`;

export interface BookmarkPreviewProps {
  previewBase64: string | undefined;
}

const BookmarkPagePreviewLink = styled.a`
  display: inline-block;

  height: 100%;
  width: 100%;
`;

const BookmarkPagePreviewSpinnerContainer = styled.a`
  display: flex;

  justify-content: center;
  align-items: center;

  height: 100%;
`;

const BookmarkPagePreview = styled.div<BookmarkPreviewProps>`
  height: 100%;
  width: 100%;

  background-origin: border-box;
  background-image: url('data:image/png;base64, ${(props) => props.previewBase64}');

  background-size: 100% auto;
  background-position: top;

  background-repeat: no-repeat;

  overflow: hidden;
`;

export interface IcoProps {
  iconBase64: string | undefined;
}

const Ico = styled.div<IcoProps>`
  margin: 0;

  height: 0.7em;
  width: 0.7em;

  background-image: url('data:image/png;base64, ${(props) => props.iconBase64}');
  background-repeat: no-repeat;
  background-size: 100%;
`;

const AddressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Address = styled.div`
  height: 1.5em;

  margin-left: 0.5em;
  color: black;
  font-size: 50%;
  text-align: center;
  text-transform: lowercase;
`;

const AddressBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 0.9em;

  padding-left: 10px;
  padding-right: 10px;

  border-radius: 3px;
  border-style: none;

  background-color: #e2dfe5;
`;

export interface BookmarkWidgetProps {
  id: string;
  url: string;
  name: string;
  iconBase64: string;
  previewBase64?: string;
  onClickDeleteBookmark: () => void;
}

export const BookmarkWidget = ({ id, url, name, iconBase64, previewBase64, onClickDeleteBookmark }: BookmarkWidgetProps): JSX.Element => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isUrlOpening, setIsUrlOpening] = useState<boolean>(false);

  return (
    <BookmarkWidgetContainer>
      <BookmarkPreviewTitleBar>
        <ButtonContent>
          <ButtonRed
            onClick={() => {
              setIsDeleted(true);
              onClickDeleteBookmark();
            }}
          />
          <ButtonYellow />
          <ButtonGreen />
        </ButtonContent>
        <AddressBar>
          <Ico iconBase64={iconBase64} />
          <AddressContainer>
            <Address>{name.slice(0, 20)}</Address>
          </AddressContainer>
        </AddressBar>
        <ButtonContent>
          <ButtonTransparent />
          <ButtonTransparent />
          <ButtonPlus>+</ButtonPlus>
        </ButtonContent>
      </BookmarkPreviewTitleBar>
      <BookmarkPagePreviewLink href={url} onClick={() => setIsUrlOpening(false)}>
        {id === '' || isDeleted || isUrlOpening ? (
          <BookmarkPagePreviewSpinnerContainer>
            <SmallSpinner />
          </BookmarkPagePreviewSpinnerContainer>
        ) : (
          <BookmarkPagePreview previewBase64={previewBase64} />
        )}
      </BookmarkPagePreviewLink>
    </BookmarkWidgetContainer>
  );
};
