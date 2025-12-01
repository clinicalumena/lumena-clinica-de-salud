import React from 'react';
import { cn } from '../../lib/utils';

interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  firstColumnBold?: boolean;
  className?: string;
}

const Table: React.FC<TableProps> = ({ headers, rows, firstColumnBold = false, className }) => {
  return (
    <div className={cn("my-8", className)}>
      <div className="md:hidden">
        {/* Mobile View: Stacked Cards */}
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-4 rounded-lg border border-border overflow-hidden bg-card">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={cn(
                  "flex justify-between items-center px-4 py-3 text-sm",
                  "border-b border-border last:border-b-0"
                )}
              >
                <span className="font-semibold text-muted-foreground text-left pr-4">
                  {headers[cellIndex]}
                </span>
                <span className={cn(
                  "text-right text-foreground",
                  firstColumnBold && cellIndex === 0 && "font-semibold"
                )}>
                  {cell}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <table className="hidden md:table w-full border-collapse">
        {/* Desktop View: Standard Table */}
        <thead>
          <tr className="bg-muted">
            {headers.map((header, index) => (
              <th
                key={index}
                className="p-4 text-left font-semibold text-foreground border-b border-border"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                "border-b border-border",
                "odd:bg-card even:bg-accent/30",
                "hover:bg-accent/50 transition-colors"
              )}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    "p-4 text-left text-foreground",
                    firstColumnBold && cellIndex === 0 && "font-semibold"
                  )}
                >
                   {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
