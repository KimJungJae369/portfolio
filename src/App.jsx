import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--bg);
  padding: 20px;
  gap: 20px;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 40px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

function App() {
  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <Dashboard />
      </MainContent>
    </AppContainer>
  );
}

export default App;
