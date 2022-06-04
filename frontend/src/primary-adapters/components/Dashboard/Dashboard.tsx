import styled from 'styled-components';
import { CreateBookmarkControl } from '../CreateBookmarkControl/CreateBookmarkControl';
import { Bookmark } from '../../../core/bookmark/entitties/bookmark';
import { BookmarkWidget } from '../BookmarkWidget/BookmarkWidget';
import { CreateBookmarkWidget } from '../CreateBookmarkWidget/CreateBookmarkWidget';

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-item: center;
`;

export interface DashboardProps {
  bookmarks: Bookmark[];
  onWidgetClick: (url: string) => void;
  onAddBookmarkClick: (url: string) => void;
  onDeleteBookmarkClick: (id: string) => void;
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Dashboard = ({ bookmarks, onWidgetClick, onAddBookmarkClick, onDeleteBookmarkClick }: DashboardProps): JSX.Element => (
  <DashboardContainer>
    {bookmarks.map((bookmark) => (
      <BookmarkWidget
        key={bookmark.id}
        id={bookmark.id}
        url={bookmark.url}
        name={bookmark.name}
        iconBase64={bookmark.iconBase64}
        previewBase64={bookmark.previewBase64}
        onDeleteBookmarkClick={onDeleteBookmarkClick}
      />
    ))}
    <CreateBookmarkWidget>
      <CreateBookmarkControl onClick={onAddBookmarkClick} />
    </CreateBookmarkWidget>
  </DashboardContainer>
);
