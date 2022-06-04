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
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Dashboard = ({ bookmarks, onWidgetClick, onAddBookmarkClick }: DashboardProps): JSX.Element => (
  <DashboardContainer>
    {bookmarks.map((bookmark, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <BookmarkWidget
        key={index}
        url={bookmark.url}
        hostname={bookmark.hostname}
        iconBase64={bookmark.iconBase64}
        previewBase64={bookmark.previewBase64}
      />
    ))}
    <CreateBookmarkWidget>
      <CreateBookmarkControl onClick={onAddBookmarkClick} />
    </CreateBookmarkWidget>
  </DashboardContainer>
);
