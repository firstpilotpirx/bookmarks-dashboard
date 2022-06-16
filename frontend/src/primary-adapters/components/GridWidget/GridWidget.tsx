import styled from 'styled-components';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { Grid } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid';
import { SetBookmarkWidget } from '../SetBookmarkWidget/SetBookmarkWidget';
import { BookmarkWidget } from '../BookmarkWidget/BookmarkWidget';

interface DashboardGridContainerProps {
  columnsCount: number;
  rowsCount: number;
}

const DashboardGridContainer = styled.div<DashboardGridContainerProps>`
  display: grid;

  width: 100%;
  height: fit-content;

  grid-template-columns: repeat(${(props) => props.columnsCount}, 1fr);
  grid-template-rows: repeat(${(props) => props.rowsCount}, auto);

  column-gap: 15px;
  row-gap: 15px;
`;

interface DashboardGridItemProps {
  columnPosition: number;
  rowsPosition: number;
}

const GridItem = styled.div<DashboardGridItemProps>`
  width: 100%;
  height: auto;

  aspect-ratio: 16 / 8;

  grid-column-start: ${(props) => props.columnPosition};
  grid-column-end: ${(props) => props.columnPosition};

  grid-row-start: ${(props) => props.rowsPosition};
  grid-row-end: ${(props) => props.rowsPosition};
`;

export interface GridProps {
  grid: Grid;
  onClickSetBookmark: (position: GridPosition, url: string, name: string) => void;
  onClickDeleteBookmark: (position: GridPosition) => void;
}

export const GridWidget = ({ grid, onClickSetBookmark, onClickDeleteBookmark }: GridProps): JSX.Element => {
  const bookmarks = grid.getAllRows().map((row, rowIndex) =>
    row.map((bookmark, columnIndex) => {
      const position = new GridPosition(rowIndex, columnIndex);
      let widget!: JSX.Element;
      if (bookmark === undefined) {
        widget = <SetBookmarkWidget onClickSetBookmark={(url: string, name: string) => onClickSetBookmark(position, url, name)} />;
      } else {
        widget = (
          <BookmarkWidget
            key={bookmark.id}
            id={bookmark.id}
            url={bookmark.url}
            name={bookmark.name}
            iconBase64={bookmark.iconBase64}
            previewBase64={bookmark.previewBase64}
            onClickDeleteBookmark={() => onClickDeleteBookmark(position)}
          />
        );
      }

      return (
        <GridItem columnPosition={columnIndex + 1} rowsPosition={rowIndex + 1}>
          {widget}
        </GridItem>
      );
    }),
  );

  return (
    <DashboardGridContainer rowsCount={grid.size.rowCount} columnsCount={grid.size.columnCount}>
      {bookmarks}
    </DashboardGridContainer>
  );
};
