import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { Dashboard } from '@bookmarks-dashboard/domain/dist/bookmark/entities/dashboard';
import { SetNewBookmarkUseCase } from '../../../core/bookmark/use-cases/set-new-bookmark-use.case';
import { DashboardHttpRepository } from '../../../secondary-adapters/http/dashboard.http.repository';
import { ReadDashboardUseCase } from '../../../core/bookmark/use-cases/read-dashboard.use-case';
import { DeleteBookmarkUseCase } from '../../../core/bookmark/use-cases/delete-bookmark.use-case';
import { FullScreenSpinner } from '../FullScreenSpinner/FullScreenSpinner';
import { GridWidget } from '../GridWidget/GridWidget';

const bookmarkRepository = new DashboardHttpRepository();
const setNewBookmarkUseCase = new SetNewBookmarkUseCase(bookmarkRepository);
const readDashboardUseCase = new ReadDashboardUseCase(bookmarkRepository);
const deleteOneBookmarkUseCase = new DeleteBookmarkUseCase(bookmarkRepository);

const AppContent = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const App = (): JSX.Element => {
  const [dashboard, setDashboard] = useState<Dashboard>(new Dashboard());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const init = async (): Promise<void> => {
    // TODO use for themes
    // const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    // if (darkThemeMq.matches) {
    //   console.log('>>>>>>>>> dark');
    // } else {
    //   console.log('>>>>>>>>> light');
    // }

    setDashboard(await readDashboardUseCase.execute());
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
        <GridWidget
          // @ts-ignore
          grid={dashboard.getGrid(0)}
          onClickSetBookmark={async (position: GridPosition, url: string, name: string) => {
            // setBookmarks([...bookmarks, new Bookmark('', url, name, '', '')]);
            await setNewBookmarkUseCase.execute(0, position, url, name);
            setDashboard(await readDashboardUseCase.execute());
          }}
          onClickDeleteBookmark={async (position: GridPosition) => {
            await deleteOneBookmarkUseCase.execute(0, position);
            setDashboard(await readDashboardUseCase.execute());
          }}
        />
      )}
    </AppContent>
  );
};

export default App;
