import styled from 'styled-components';
import { DashboardTab } from '../DashboardTab/DashboardTab';

const AppContent = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
`;

const App = (): JSX.Element => (
  <AppContent>
    <DashboardTab />
  </AppContent>
);

export default App;
