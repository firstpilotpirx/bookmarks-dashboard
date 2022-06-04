import { useEffect, useState } from 'react';
import { Dashboard } from '../Dashboard/Dashboard';
import { Bookmark } from '../../../core/bookmark/entitties/bookmark';
import { CreateNewBookmarkUseCase } from '../../../core/bookmark/use-cases/create-new-bookmark.use-case';
import { BookmarkHttpRepository } from '../../../secondary-adapters/http/bookmark.http.repository';
import { ReadAllBookmarksUseCase } from '../../../core/bookmark/use-cases/read-all-bookmarks.use-case';
import { DeleteOneBookmarkUseCase } from '../../../core/bookmark/use-cases/delete-one-bookmark.use-case';

// const dashboard = new DashboardService();

const bookmarkRepository = new BookmarkHttpRepository();
const createNewBookmarkUseCase = new CreateNewBookmarkUseCase(bookmarkRepository);
const readAllBookmarksUseCase = new ReadAllBookmarksUseCase(bookmarkRepository);
const deleteOneBookmarkUseCase = new DeleteOneBookmarkUseCase(bookmarkRepository);

const App = (): JSX.Element => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const init = async (): Promise<void> => {
    setBookmarks([...(await readAllBookmarksUseCase.execute())]);
  };

  const [hasBeenCalled, setHasBeenCalled] = useState(false);

  useEffect(() => {
    if (hasBeenCalled) {
      return;
    }

    console.log('init');
    setHasBeenCalled(true);
    init()
      .then(() => {})
      .catch(() => {});
  });

  return (
    <Dashboard
      bookmarks={bookmarks}
      onWidgetClick={(url: string) => {
        window.location.href = url;
      }}
      onAddBookmarkClick={async (url: string) => {
        await createNewBookmarkUseCase.execute(url, '');
        setBookmarks([...(await readAllBookmarksUseCase.execute())]);
      }}
      onDeleteBookmarkClick={async (id: string) => {
        await deleteOneBookmarkUseCase.execute(id);
        setBookmarks([...(await readAllBookmarksUseCase.execute())]);
      }}
    />
  );
};

export default App;
