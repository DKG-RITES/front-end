'use client'

import React from 'react';

type TableHeaderProps = {
  headers: string[];
  colSpans?: number[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ headers, colSpans = [] }) => (
  <thead>
    <tr>
      {headers.map((header, index) => (
        <th key={index} colSpan={colSpans[index] || 1} style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

type TableRowProps = {
  cells: string[];
};

const TableRow: React.FC<TableRowProps> = ({ cells }) => (
  <tr>
    {cells.map((cell, index) => (
      <td key={index} style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
        {cell}
      </td>
    ))}
  </tr>
);

type TableProps = {
  headers: string[];
  colSpans?: number[];
  rows: string[][];
};

const Table: React.FC<TableProps> = ({ headers, colSpans = [], rows }) => (
  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <TableHeader headers={headers} colSpans={colSpans} />
    <tbody>
      {rows.map((row, index) => (
        <TableRow key={index} cells={row} />
      ))}
    </tbody>
  </table>
);

export default Table;