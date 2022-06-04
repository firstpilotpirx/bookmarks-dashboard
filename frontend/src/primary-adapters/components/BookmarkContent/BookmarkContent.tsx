import styled from 'styled-components';

export interface BookmarkContentContainerProps {
  previewBase64: string;
}

const BookmarkContentContainer = styled.div<BookmarkContentContainerProps>`
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-image: url('data:image/png;base64, ${(props) => props.previewBase64}');
  background-size: 100%;

  overflow: hidden;
`;

const Name = styled.div`
  margin: 10px;
  text-align: center;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IcoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
`;

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Ico = styled.img`
  margin: 0px;

  height: 18px;
  width: 18px;
`;

const Header = styled.div`
  height: 15px;
  margin: 2px;
  display: flex;
`;

const Body = styled.div`
  display: flex;

  justify-content: center;
`;

const Footer = styled.div`
  height: 15px;
`;

export interface BookmarkContentProps {
  name: string;
  url: string;
  // eslint-disable-next-line react/no-unused-prop-types
  hostname: string;
  previewBase64: string;
  onClick: (url: string) => void;
}

// @ts-ignore
// eslint-disable-next-line react/prop-types
export const BookmarkContent = ({ name, url, _hostname, previewBase64, onClick }: BookmarkContentProps): JSX.Element => (
  <BookmarkContentContainer previewBase64={previewBase64} onClick={(): void => onClick(url)}>
    <Header>
      {/* <IcoContainer> */}
      {/*  <Ico src={`https://${hostname}/favicon.ico`} /> */}
      {/* </IcoContainer> */}
    </Header>
    <Body>
      <Name>{name}</Name>
    </Body>
    <Footer />
  </BookmarkContentContainer>
);
