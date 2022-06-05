import { useEffect, useState } from 'react';
import { Dashboard } from '../Dashboard/Dashboard';
import { Bookmark } from '../../../core/bookmark/entitties/bookmark';
import { CreateNewBookmarkUseCase } from '../../../core/bookmark/use-cases/create-new-bookmark.use-case';
import { BookmarkHttpRepository } from '../../../secondary-adapters/http/bookmark.http.repository';
import { ReadAllBookmarksUseCase } from '../../../core/bookmark/use-cases/read-all-bookmarks.use-case';
import { DeleteOneBookmarkUseCase } from '../../../core/bookmark/use-cases/delete-one-bookmark.use-case';
import { FullScreenSpinner } from '../FullScreenSpinner/FullScreenSpinner';

const bookmarkRepository = new BookmarkHttpRepository();
const createNewBookmarkUseCase = new CreateNewBookmarkUseCase(bookmarkRepository);
const readAllBookmarksUseCase = new ReadAllBookmarksUseCase(bookmarkRepository);
const deleteOneBookmarkUseCase = new DeleteOneBookmarkUseCase(bookmarkRepository);

const App = (): JSX.Element => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
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
      {isLoading ? <FullScreenSpinner /> : null}
      {!isLoading ? (
        <Dashboard
          bookmarks={bookmarks}
          onClickCreateBookmark={async (url: string, name: string) => {
            setBookmarks([...bookmarks, new Bookmark('', url, name, '', '')]);
            await createNewBookmarkUseCase.execute(url, name);
            setBookmarks([...(await readAllBookmarksUseCase.execute())]);
          }}
          onDeleteBookmarkClick={async (id: string) => {
            await deleteOneBookmarkUseCase.execute(id);
            setBookmarks([...(await readAllBookmarksUseCase.execute())]);
          }}
        />
      ) : null}
    </div>
  );
};

export default App;
