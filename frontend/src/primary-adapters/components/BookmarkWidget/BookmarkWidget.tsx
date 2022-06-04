import styled from 'styled-components';

const height = 9 * 15;
const width = 16 * 15;

const BookmarkWidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-item: center;

  height: 130px;
  width: 200px;

  height: ${height + 20}px;
  width: ${width}px;

  margin: 10px;
`;

const BookmarkWidgetHeader = styled.div`
  text-align: center;
  font-size: 0.7em;
`;

const BookmarkWidgetBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;

  height: ${height}px;
  width: ${width}px;

  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 20px;
  // border: 1px solid rgba(255, 255, 255, 0.25);
  border: 0px solid black;
  border-radius: 7px;
  // box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  // backdrop-filter: blur(15px);

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
  height: 15%;
  background-color: #fafafa;
  background-color: #000000;

  overflow: hidden;
`;

const RoundButtonSize = 0.6;

const ButtonRed = styled.div`
  width: ${RoundButtonSize}em;
  height: ${RoundButtonSize}em;
  border-radius: 50%;

  background-color: #fe5f58;
`;

const ButtonYellow = styled.div`
  width: ${RoundButtonSize}em;
  height: ${RoundButtonSize}em;
  border-radius: 50%;

  background-color: #febc30;
`;

const ButtonGreen = styled.div`
  width: ${RoundButtonSize}em;
  height: ${RoundButtonSize}em;
  border-radius: 50%;

  background-color: #24c840;
`;

const ButtonTransparent = styled.div`
  width: ${RoundButtonSize}em;
  height: ${RoundButtonSize}em;
  border-radius: 50%;
`;

const ButtonPlus = styled.div`
  width: ${RoundButtonSize}em;
  color: white;
  font-size: 50%;
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

const BookmarkPreview = styled.div<BookmarkPreviewProps>`
  height: 85%;
  background-image: url('data:image/png;base64, ${(props) => props.previewBase64}');
  background-size: 100%;

  overflow: hidden;
`;

export interface IcoProps {
  iconBase64: string | undefined;
}

const Ico = styled.div<IcoProps>`
  margin: 0px;

  height: 0.7em;
  width: 0.7em;

  background-image: url('data:image/png;base64, ${(props) => props.iconBase64}');
  background-repeat: no-repeat;

  background-size: cover;
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
  onDeleteBookmarkClick: (id: string) => void;
}

export const BookmarkWidget = ({ id, url, name, iconBase64, previewBase64, onDeleteBookmarkClick }: BookmarkWidgetProps): JSX.Element => (
  <BookmarkWidgetContainer>
    <BookmarkWidgetHeader />
    <BookmarkWidgetBody>
      <BookmarkPreviewTitleBar>
        <ButtonContent>
          <ButtonRed onClick={() => onDeleteBookmarkClick(id)} />
          <ButtonYellow />
          <ButtonGreen />
        </ButtonContent>
        <AddressBar>
          <Ico iconBase64={iconBase64} />
          <AddressContainer>
            <Address>{name.slice(0, 30)}</Address>
          </AddressContainer>
        </AddressBar>
        <ButtonContent>
          <ButtonTransparent />
          <ButtonTransparent />
          <ButtonPlus>+</ButtonPlus>
        </ButtonContent>
      </BookmarkPreviewTitleBar>
      <BookmarkPreview
        onClick={() => {
          window.location.replace(url);
        }}
        previewBase64={previewBase64}
      />
    </BookmarkWidgetBody>
  </BookmarkWidgetContainer>
);
