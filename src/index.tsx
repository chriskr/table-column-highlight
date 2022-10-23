import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import './index.css';
import TableWithColumnHighlight from './TableWithColumnHighlight';

const Container = styled.div`
  height: 90vh;
  width: 90vw;
  margin: 5vh 5vw;
  border: 1px solid hsl(0, 0%, 75%);
  box-sizing: border-box;
  overflow: auto;
`;
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Container>
      <TableWithColumnHighlight columnCount={100} rowCount={100} />
    </Container>
  </React.StrictMode>
);
