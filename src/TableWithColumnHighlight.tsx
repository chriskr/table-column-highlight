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

const TableWithColumnHighlight = ({
  rowCount,
  columnCount,
}: {
  rowCount: number;
  columnCount: number;
}) => {
  const [columnHighlightIndex, setColumnHighlightIndex] = useState(-1);

  return (
    <Table
      onMouseLeave={() => setColumnHighlightIndex(-1)}
      onMouseOver={({ target }: React.MouseEvent) =>
        setColumnHighlightIndex(
          Number.parseInt(
            (target as HTMLElement).closest('td')?.dataset.columnIndex ?? '-1'
          )
        )
      }
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
            {Array.from(range(columnCount)).map((columnIndex) => (
              <Td
                key={`tr-${columnIndex}`}
                data-column-index={columnIndex}
              >{`cell ${rowIndex * columnCount + columnIndex}`}</Td>
            ))}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableWithColumnHighlight;
