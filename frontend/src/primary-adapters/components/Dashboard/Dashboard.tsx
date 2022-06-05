import styled from 'styled-components';
import { CreateBookmarkControl } from '../CreateBookmarkControl/CreateBookmarkControl';
import { Bookmark } from '../../../core/bookmark/entitties/bookmark';
import { BookmarkWidget } from '../BookmarkWidget/BookmarkWidget';
import { CreateBookmarkWidget } from '../CreateBookmarkWidget/CreateBookmarkWidget';

const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  gap: 20px;
  margin-left: 20px;
  margin-top: 20px;
`;

export interface DashboardProps {
  bookmarks: Bookmark[];
  onClickCreateBookmark: (url: string, name: string) => void;
  onDeleteBookmarkClick: (id: string) => void;
}

export const Dashboard = ({ bookmarks, onClickCreateBookmark, onDeleteBookmarkClick }: DashboardProps): JSX.Element => (
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
      <CreateBookmarkControl onClickCreateBookmark={onClickCreateBookmark} />
    </CreateBookmarkWidget>
  </DashboardContainer>
);
