import styled from 'styled-components';
import { BookmarkWithPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/bookmark-with-position';
import { BookmarkWidget } from '../BookmarkWidget/BookmarkWidget';

interface DashboardGridContainerProps {
  columnsCount: number;
  rowsCount: number;
}

const DashboardGridContainer = styled.div<DashboardGridContainerProps>`
  display: grid;

  margin-left: 20px;
  margin-top: 20px;

  grid-template-columns: repeat(${(props) => props.columnsCount}, 300px);
  grid-template-rows: repeat(${(props) => props.rowsCount}, auto);

  column-gap: 20px;
  row-gap: 20px;
`;

interface DashboardGridItemProps {
  columnPosition: number;
  rowsPosition: number;
  backgroundColor: string;
}

const DashboardGridItem = styled.div<DashboardGridItemProps>`
  background-color: ${(props) => props.backgroundColor};

  grid-column-start: ${(props) => props.columnPosition};
  grid-column-end: ${(props) => props.columnPosition};

  grid-row-start: ${(props) => props.rowsPosition};
  grid-row-end: ${(props) => props.rowsPosition};
`;

export interface DashboardGridProps {
  bookmarks: BookmarkWithPosition[];
  onClickCreateBookmark: (url: string, name: string) => void;
  onDeleteBookmarkClick: (id: string) => void;
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DashboardGrid = ({ bookmarks, onClickCreateBookmark, onDeleteBookmarkClick }: DashboardGridProps): JSX.Element => (
  <DashboardGridContainer columnsCount={16} rowsCount={10}>
    {bookmarks.map((bookmarkWithPosition) => (
      // console.log((index % 5) + 1, Math.floor(index / 5) + 1);
      <DashboardGridItem
        columnPosition={bookmarkWithPosition.position.column}
        rowsPosition={bookmarkWithPosition.position.row}
        backgroundColor="red"
      >
        <BookmarkWidget
          key={bookmarkWithPosition.bookmark.id}
          id={bookmarkWithPosition.bookmark.id}
          url={bookmarkWithPosition.bookmark.url}
          name={bookmarkWithPosition.bookmark.name}
          iconBase64={bookmarkWithPosition.bookmark.iconBase64}
          previewBase64={bookmarkWithPosition.bookmark.previewBase64}
          onDeleteBookmarkClick={onDeleteBookmarkClick}
        />
      </DashboardGridItem>
    ))}
    {/* <DashboardGridItem columnPosition={1} rowsPosition={1} backgroundColor="red" /> */}
    {/* <DashboardGridItem columnPosition={2} rowsPosition={1} backgroundColor="green" /> */}
    {/* <DashboardGridItem columnPosition={3} rowsPosition={1} backgroundColor="blue" /> */}
    {/* <DashboardGridItem columnPosition={4} rowsPosition={1} backgroundColor="gray" /> */}
    {/* <DashboardGridItem columnPosition={6} rowsPosition={1} backgroundColor="purple" /> */}
    {/* <DashboardGridItem columnPosition={1} rowsPosition={2} backgroundColor="green" /> */}
    {/* <DashboardGridItem columnPosition={2} rowsPosition={2} backgroundColor="blue" /> */}
    {/* <DashboardGridItem columnPosition={3} rowsPosition={2} backgroundColor="black" /> */}
    {/* <DashboardGridItem columnPosition={7} rowsPosition={2} backgroundColor="white" /> */}
    {/* <DashboardGridItem columnPosition={8} rowsPosition={2} backgroundColor="orange" /> */}
  </DashboardGridContainer>
);
