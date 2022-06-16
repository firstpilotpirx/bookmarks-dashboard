import styled from 'styled-components';
import { Dashboard } from '@bookmarks-dashboard/domain/dist/bookmark/entities/dashboard';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { useEffect, useState } from 'react';
import { GridWidget } from '../GridWidget/GridWidget';
import { DashboardHttpRepository } from '../../../secondary-adapters/http/dashboard.http.repository';
import { SetNewBookmarkUseCase } from '../../../core/bookmark/use-cases/set-new-bookmark-use.case';
import { ReadDashboardUseCase } from '../../../core/bookmark/use-cases/read-dashboard.use-case';
import { DeleteBookmarkUseCase } from '../../../core/bookmark/use-cases/delete-bookmark.use-case';
import { FullScreenSpinner } from '../FullScreenSpinner/FullScreenSpinner';
import { CreateTabButton, TabButton } from '../TabButton/TabButton';
import { ChangeGridNameUseCase } from '../../../core/bookmark/use-cases/change-grid-name.use-case';
import { CreateGridUseCase } from '../../../core/bookmark/use-cases/create-grid.use-case';
import { DeleteGridUseCase } from '../../../core/bookmark/use-cases/delete-grid.use-case';

const TabContainer = styled.div`
  margin: 0;
  padding: 0;

  box-sizing: border-box;
  width: 100%;
  height: fit-content;
`;

const TabBar = styled.div`
  padding-top: 0;
  padding-bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0 0;

  background-color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 7px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(15px);

  color: white;
  text-transform: uppercase;
  font-weight: bold;

  cursor: auto;

  overflow: hidden;
`;

const TabContent = styled.div`
  margin-top: 15px;
  padding: 0;

  box-sizing: border-box;
  width: 100%;
  height: fit-content;
`;

export interface DashboardTabProps {}

const bookmarkRepository = new DashboardHttpRepository();
const setNewBookmarkUseCase = new SetNewBookmarkUseCase(bookmarkRepository);
const readDashboardUseCase = new ReadDashboardUseCase(bookmarkRepository);
const deleteOneBookmarkUseCase = new DeleteBookmarkUseCase(bookmarkRepository);
const changeGridNameUseCase = new ChangeGridNameUseCase(bookmarkRepository);
const createGridUseCase = new CreateGridUseCase(bookmarkRepository);
const deleteGridUseCase = new DeleteGridUseCase(bookmarkRepository);

// eslint-disable-next-line no-empty-pattern
export const DashboardTab = ({}: DashboardTabProps): JSX.Element => {
  const [dashboard, setDashboard] = useState<Dashboard>(new Dashboard());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedGridIndex, setSelectedGridIndex] = useState<number>(0);

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

  const tabsWidget = dashboard.getAllGrids().map((grid, gridIndex) => (
    <TabButton
      name={grid.name}
      isActive={gridIndex === selectedGridIndex}
      onClick={() => setSelectedGridIndex(gridIndex)}
      onChangeGridName={async (newName: string) => {
        await changeGridNameUseCase.execute(gridIndex, newName);
        setDashboard(await readDashboardUseCase.execute());
      }}
      onDelete={async () => {
        await deleteGridUseCase.execute(gridIndex);
        setDashboard(await readDashboardUseCase.execute());
      }}
    />
  ));

  let currentGrid;
  try {
    currentGrid = dashboard.getGrid(selectedGridIndex);
  } catch (error) {}

  const gridWidget =
    currentGrid === undefined ? null : (
      <GridWidget
        grid={currentGrid}
        onClickSetBookmark={async (position: GridPosition, url: string, name: string) => {
          await setNewBookmarkUseCase.execute(selectedGridIndex, position, url, name);
          setDashboard(await readDashboardUseCase.execute());
        }}
        onClickDeleteBookmark={async (position: GridPosition) => {
          await deleteOneBookmarkUseCase.execute(selectedGridIndex, position);
          setDashboard(await readDashboardUseCase.execute());
        }}
      />
    );

  return isLoading ? (
    <FullScreenSpinner />
  ) : (
    <TabContainer>
      <TabBar>
        {tabsWidget}
        <CreateTabButton
          onClick={async () => {
            await createGridUseCase.execute();
            setDashboard(await readDashboardUseCase.execute());
          }}
        >
          +
        </CreateTabButton>
      </TabBar>
      <TabContent>{gridWidget}</TabContent>
    </TabContainer>
  );
};
