import { useEffect, useState } from 'react';
import { BookmarkWithPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/bookmark-with-position';
import { CreateNewBookmarkUseCase } from '../../../core/bookmark/use-cases/create-new-bookmark.use-case';
import { BookmarkHttpRepository } from '../../../secondary-adapters/http/bookmark.http.repository';
import { ReadAllBookmarksUseCase } from '../../../core/bookmark/use-cases/read-all-bookmarks.use-case';
import { DeleteOneBookmarkUseCase } from '../../../core/bookmark/use-cases/delete-one-bookmark.use-case';
import { FullScreenSpinner } from '../FullScreenSpinner/FullScreenSpinner';
import { DashboardGrid } from '../DashboardGrid/DashboardGrid';

const bookmarkRepository = new BookmarkHttpRepository();
const createNewBookmarkUseCase = new CreateNewBookmarkUseCase(bookmarkRepository);
const readAllBookmarksUseCase = new ReadAllBookmarksUseCase(bookmarkRepository);
const deleteOneBookmarkUseCase = new DeleteOneBookmarkUseCase(bookmarkRepository);

const App = (): JSX.Element => {
  const [bookmarks, setBookmarks] = useState<BookmarkWithPosition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const init = async (): Promise<void> => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkThemeMq.matches) {
      console.log('>>>>>>>>> dark');
    } else {
      console.log('>>>>>>>>> light');
    }

    setBookmarks([...(await readAllBookmarksUseCase.execute())]);
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
    <div>
      <DashboardGrid
        bookmarks={bookmarks}
        onClickCreateBookmark={async (url: string, name: string) => {
          // setBookmarks([...bookmarks, new Bookmark('', url, name, '', '')]);
          await createNewBookmarkUseCase.execute(url, name);
          setBookmarks([...(await readAllBookmarksUseCase.execute())]);
        }}
        onDeleteBookmarkClick={async (id: string) => {
          await deleteOneBookmarkUseCase.execute(id);
          setBookmarks([...(await readAllBookmarksUseCase.execute())]);
        }}
      />
      {isLoading ? <FullScreenSpinner /> : null}
      {/* {!isLoading ? ( */}
      {/*  <DashboardFlex */}
      {/*    bookmarks={bookmarks} */}
      {/*    onClickCreateBookmark={async (url: string, name: string) => { */}
      {/*      // setBookmarks([...bookmarks, new Bookmark('', url, name, '', '')]); */}
      {/*      await createNewBookmarkUseCase.execute(url, name); */}
      {/*      setBookmarks([...(await readAllBookmarksUseCase.execute())]); */}
      {/*    }} */}
      {/*    onDeleteBookmarkClick={async (id: string) => { */}
      {/*      await deleteOneBookmarkUseCase.execute(id); */}
      {/*      setBookmarks([...(await readAllBookmarksUseCase.execute())]); */}
      {/*    }} */}
      {/*  /> */}
      {/* ) : null} */}
    </div>
  );
};

export default App;
