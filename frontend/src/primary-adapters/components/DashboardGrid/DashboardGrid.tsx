import styled from 'styled-components';
import { GridBookmark } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-bookmark';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { BookmarkWidget } from '../BookmarkWidget/BookmarkWidget';
import { SetBookmarkWidget } from '../SetBookmarkWidget/SetBookmarkWidget';

interface DashboardGridContainerProps {
  columnsCount: number;
  rowsCount: number;
}

const DashboardGridContainer = styled.div<DashboardGridContainerProps>`
  display: grid;

  width: calc(100% - 40px);
  height: fit-content;

  grid-template-columns: repeat(${(props) => props.columnsCount}, 1fr);
  grid-template-rows: repeat(${(props) => props.rowsCount}, auto);

  column-gap: 20px;
  row-gap: 20px;
`;

interface DashboardGridItemProps {
  columnPosition: number;
  rowsPosition: number;
}

const DashboardGridItem = styled.div<DashboardGridItemProps>`
  width: 100%;
  height: auto;

  aspect-ratio: 16 / 8;

  grid-column-start: ${(props) => props.columnPosition};
  grid-column-end: ${(props) => props.columnPosition};

  grid-row-start: ${(props) => props.rowsPosition};
  grid-row-end: ${(props) => props.rowsPosition};
`;

export interface DashboardGridProps {
  gridBookmark: GridBookmark;
  onClickSetBookmark: (position: GridPosition, url: string, name: string) => void;
  onDeleteBookmarkClick: (id: string) => void;
}

export const DashboardGrid = ({ gridBookmark, onClickSetBookmark, onDeleteBookmarkClick }: DashboardGridProps): JSX.Element => {
  const dashboardGridItemSet = [];
  const rowsCount = 7;
  const columnsCount = 6;
  for (let rowIndex = 1; rowIndex <= rowsCount; rowIndex++) {
    for (let columnIndex = 1; columnIndex <= columnsCount; columnIndex++) {
      const position = new GridPosition(rowIndex, columnIndex);
      const bookmark = gridBookmark.getBookmark(position);
      if (bookmark === undefined) {
        dashboardGridItemSet.push(
          <DashboardGridItem columnPosition={columnIndex} rowsPosition={rowIndex}>
            <SetBookmarkWidget position={position} onClickSetBookmark={onClickSetBookmark} />
          </DashboardGridItem>,
        );
      } else {
        dashboardGridItemSet.push(
          <DashboardGridItem columnPosition={columnIndex} rowsPosition={rowIndex}>
            <BookmarkWidget
              key={bookmark.id}
              id={bookmark.id}
              url={bookmark.url}
              name={bookmark.name}
              iconBase64={bookmark.iconBase64}
              previewBase64={bookmark.previewBase64}
              onDeleteBookmarkClick={onDeleteBookmarkClick}
            />
          </DashboardGridItem>,
        );
      }
    }
  }

  return (
    <DashboardGridContainer rowsCount={rowsCount} columnsCount={columnsCount}>
      {dashboardGridItemSet}
    </DashboardGridContainer>
  );
};
