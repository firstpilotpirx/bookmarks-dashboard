import { BookmarkState } from '../bookmark/bookmark-state';
import { GridSizeState } from '../grid-size/grid-size.state';

export interface GridState {
  name: string;
  size: GridSizeState;
  grid: Array<Array<BookmarkState | undefined>>;
}
