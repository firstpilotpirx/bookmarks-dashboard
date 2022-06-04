import { useEffect, useState } from 'react';
import { Dashboard } from '../Dashboard/Dashboard';
import { Bookmark } from '../../../core/bookmark/entitties/bookmark';
import { CreateNewBookmarkUseCase } from '../../../core/bookmark/use-cases/create-new-bookmark.use-case';
import { BookmarkHttpRepository } from '../../../secondary-adapters/http/bookmark.http.repository';
import { ReadAllBookmarksUseCase } from '../../../core/bookmark/use-cases/read-all-bookmarks.use-case';

// const dashboard = new DashboardService();

const bookmarkRepository = new BookmarkHttpRepository();
const createNewBookmarkUseCase = new CreateNewBookmarkUseCase(bookmarkRepository);
const readAllBookmarksUseCase = new ReadAllBookmarksUseCase(bookmarkRepository);

const App = (): JSX.Element => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const init = async (): Promise<void> => {
    // await Promise.all(
    //   [dashboard.createBookmark('google', 'https://www.google.com/?client=safari'),
    // dashboard.createBookmark('youtube', 'https://www.youtube.com'),
    // dashboard.createBookmark('translate', 'https://translate.google.com/?sl=en&tl=ru&op=translate'),
    // dashboard.createBookmark('gmail', 'https://mail.google.com/mail/u/0/#inbox'),
    // dashboard.createBookmark('gdrive', 'https://drive.google.com/drive/my-drive'),
    // dashboard.createBookmark('github', 'https://github.com/1inch'),
    // dashboard.createBookmark('gpass', 'https://passwords.google.com/'),
    // dashboard.createBookmark('draw.io', 'https://app.diagrams.net/'),
    // dashboard.createBookmark('racing game', 'https://racing-game-api-staging.1inch.io/api/'),
    // dashboard.createBookmark('deel', 'https://app.letsdeel.com/login'),
    // dashboard.createBookmark('expensify', 'https://www.expensify.com/?exitTo=inbox&email='),
    // dashboard.createBookmark('chainlist', 'https://chainlist.org/'),
    // dashboard.createBookmark('etherscan', 'https://etherscan.io/'),
    // dashboard.createBookmark('bscscan', 'https://bscscan.com/'),
    // dashboard.createBookmark('polygonscan', 'https://polygonscan.com/'),
    // dashboard.createBookmark('arbiscan', 'https://arbiscan.io/'),
    // dashboard.createBookmark('optimistic', 'https://optimistic.etherscan.io/'),
    // dashboard.createBookmark('avascan', 'https://avascan.info/'),
    // dashboard.createBookmark(':15673', 'http://localhost:15673/'),
    // dashboard.createBookmark('statushero', 'https://statushero.com/teams/1inch-backend/statuses/current/edit'),
    // dashboard.createBookmark('notion', 'https://www.notion.so/login'),
    // dashboard.createBookmark('atlassian', 'https://1inch.atlassian.net/jira/software/projects/MBNP/boards/37'),
    // dashboard.createBookmark('linkedin', 'https://www.linkedin.com/'),
    // dashboard.createBookmark('metro', 'https://yandex.ru/metro/moscow?scheme_id=sc34974011'),
    // dashboard.createBookmark('mindmeister', 'https://www.mindmeister.com/folders'),
    // dashboard.createBookmark('udemy', 'https://www.udemy.com/'),
    // dashboard.createBookmark('whatsapp', 'https://web.whatsapp.com/'),
    // dashboard.createBookmark('aliexpress', 'https://aliexpress.ru/?gatewayAdapt=glo2rus'),
    // dashboard.createBookmark('educative', 'https://www.educative.io/path/scalability-system-design'),
    // dashboard.createBookmark('leetcode', 'https://leetcode.com/problemset/all/'),
    // dashboard.createBookmark('tinkoff', 'https://id.tinkoff.ru/auth/step?cid=Cm3PJ9A3IpC0'),
    // dashboard.createBookmark('', 'https://www.rapidtables.com/convert/number/decimal-to-hex.html'),
    // dashboard.createBookmark(
    //   'ddd hexagonal onion clean',
    //   'https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/#application-layer',
    // ),
    // dashboard.createBookmark('grafana', 'https://grafana.1inch.io/?orgId=1&search=open'),
    // dashboard.createBookmark('colors', 'https://coolors.co/'),
    // dashboard.createBookmark('color-image-generator', 'https://mdigi.tools/solid-color-image-generator/'),
    // dashboard.createBookmark('minio', 'http://localhost:9001/')
    // ],
    // );

    // await dashboard.createBookmark('google', 'https://www.google.com/?client=safari');
    // await dashboard.createBookmark('youtube', 'https://www.youtube.com');

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
        await createNewBookmarkUseCase.execute(url, url);
        setBookmarks([...(await readAllBookmarksUseCase.execute())]);
      }}
    />
  );
};

export default App;
