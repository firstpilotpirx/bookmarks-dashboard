import { BookmarkState } from './bookmark-state';
import { GridSizeState } from './grid-size.state';

export interface GridState {
  name: string;
  size: GridSizeState;
  grid: Array<Array<BookmarkState | undefined>>;
}
