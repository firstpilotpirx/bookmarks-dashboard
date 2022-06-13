import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GridBookmark } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-bookmark';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { SetNewBookmarkUseCase } from '../../../core/bookmark/use-cases/set-new-bookmark-use.case';
import { BookmarkHttpRepository } from '../../../secondary-adapters/http/bookmark.http.repository';
import { ReadAllBookmarksUseCase } from '../../../core/bookmark/use-cases/read-all-bookmarks.use-case';
import { DeleteOneBookmarkUseCase } from '../../../core/bookmark/use-cases/delete-one-bookmark.use-case';
import { FullScreenSpinner } from '../FullScreenSpinner/FullScreenSpinner';
import { DashboardGrid } from '../DashboardGrid/DashboardGrid';

const bookmarkRepository = new BookmarkHttpRepository();
const setNewBookmarkUseCase = new SetNewBookmarkUseCase(bookmarkRepository);
const readAllBookmarksUseCase = new ReadAllBookmarksUseCase(bookmarkRepository);
const deleteOneBookmarkUseCase = new DeleteOneBookmarkUseCase(bookmarkRepository);

const AppContent = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const App = (): JSX.Element => {
  const [gridBookmark, setGridBookmark] = useState<GridBookmark>(new GridBookmark(1, 1));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const init = async (): Promise<void> => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkThemeMq.matches) {
      console.log('>>>>>>>>> dark');
    } else {
      console.log('>>>>>>>>> light');
    }

    setGridBookmark(await readAllBookmarksUseCase.execute());
    setIsLoading(false);
  };

  const [hasBeenCalled, setHasBeenCalled] = useState(false);

  useEffect(() => {
    if (hasBeenCalled) {
      return;
    }

    setHasBeenCalled(true);
    init()
      .then(() => {})
      .catch(() => {});
  });

  return (
    <AppContent>
      {isLoading ? (
        <FullScreenSpinner />
      ) : (
        <DashboardGrid
          gridBookmark={gridBookmark}
          onClickSetBookmark={async (position: GridPosition, url: string, name: string) => {
            // setBookmarks([...bookmarks, new Bookmark('', url, name, '', '')]);
            await setNewBookmarkUseCase.execute(position, url, name);
            setGridBookmark(await readAllBookmarksUseCase.execute());
          }}
          onDeleteBookmarkClick={async (id: string) => {
            await deleteOneBookmarkUseCase.execute(id);
            setGridBookmark(await readAllBookmarksUseCase.execute());
          }}
        />
      )}
    </AppContent>
  );
};

export default App;
