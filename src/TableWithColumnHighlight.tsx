import React, { useState } from 'react';
import styled from 'styled-components';

const range = function* (start: number, end?: number, step?: number) {
  if (end === undefined) {
    [start, end, step] = [0, start, 1];
  } else if (step === undefined) {
    [start, end, step] = [start, end, 1];
  }
  const isGrowing = end > start;
  if (
    (isGrowing && start + step < start) ||
    (!isGrowing && start + step > start)
  ) {
    return [];
  }
  while (isGrowing ? start < end : start > end) {
    yield start;
    start += step;
  }
};

const Table = styled.table`
  font-family: system-ui;
  border-spacing: 0;
`;

const Col = styled.col`
  &.highlight {
    background-color: hsl(210, 100%, 95%);
  }
`;

const Tr = styled.tr`
  &:hover {
    background-color: hsl(210, 100%, 95%);
  }
`;

const Td = styled.td`
  padding: 7px 14px;
  cursor: pointer;
  white-space: nowrap;
`;

let t: any = null;

const TableWithColumnHighlight = ({
  rowCount,
  columnCount,
}: {
  rowCount: number;
  columnCount: number;
}) => {
  const [columnHighlightIndex, setColumnHighlightIndex] = useState(-1);

  const onMouseOver = (event: React.MouseEvent) => {
    if (!(event.target instanceof HTMLElement)) {
      setColumnHighlightIndex(-1);
      return;
    }
    const currentIndex = Number.parseInt(
      event.target.closest('td')?.dataset.columnIndex ?? '-1'
    );

    if (currentIndex !== columnHighlightIndex) {
      setColumnHighlightIndex(currentIndex);
    }
  };

  return (
    <Table
      onMouseLeave={() => setColumnHighlightIndex(-1)}
      onMouseOver={onMouseOver}
    >
      <colgroup>
        {Array.from(range(columnCount)).map((index) => (
          <Col
            key={`col-${index}`}
            className={index === columnHighlightIndex ? 'highlight' : ''}
          />
        ))}
      </colgroup>
      <thead></thead>
      <tbody>
        {Array.from(range(rowCount)).map((rowIndex) => (
          <Tr key={`tr-${rowIndex}`}>
            {Array.from(range(columnCount)).map((columenIndex) => (
              <Td
                key={`tr-${columenIndex}`}
                data-column-index={columenIndex}
              >{`cell ${rowIndex * columnCount + columenIndex}`}</Td>
            ))}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableWithColumnHighlight;
