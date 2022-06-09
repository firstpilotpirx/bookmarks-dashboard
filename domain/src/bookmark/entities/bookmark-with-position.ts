import { GridPosition } from './grid-position';
import { Bookmark } from './bookmark';

export class BookmarkWithPosition {
  constructor(public position: GridPosition, public bookmark: Bookmark) {}
}
