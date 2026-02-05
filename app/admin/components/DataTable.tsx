"use client";
import React from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onEdit?: (row: any) => void;
  onDelete?: (id: string) => void;
}

export default function DataTable({ data, columns, onEdit, onDelete }: DataTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <div className="text-center py-12 text-gray-400">
          Keine Daten vorhanden
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      {/* Mobile: Card-basierte Ansicht */}
      <div className="md:hidden space-y-4 p-4">
        {data.map((row, index) => (
          <div
            key={row._id || index}
            className="bg-gray-800 rounded-lg p-4 space-y-3 border border-gray-700"
          >
            {columns.map((column) => {
              const cellValue = row[column.key];
              return (
                <div key={column.key} className="space-y-1">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {column.label}
                  </div>
                  <div className="text-sm text-gray-300 break-words">
                    {column.render
                      ? column.render(cellValue, row)
                      : String(cellValue || '')}
                  </div>
                </div>
              );
            })}
            {(onEdit || onDelete) && (
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-700">
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="p-3 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Bearbeiten"
                  >
                    <IconEdit className="w-5 h-5" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row._id)}
                    className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Löschen"
                  >
                    <IconTrash className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop: Tabellenansicht */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Aktionen
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.map((row, index) => (
              <tr key={row._id || index} className="hover:bg-gray-800/50 transition-colors">
                {columns.map((column) => {
                  const cellValue = row[column.key];
                  return (
                    <td key={column.key} className="px-6 py-4 text-sm text-gray-300">
                      <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl truncate">
                        {column.render
                          ? column.render(cellValue, row)
                          : String(cellValue || '')}
                      </div>
                    </td>
                  );
                })}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                          aria-label="Bearbeiten"
                        >
                          <IconEdit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row._id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                          aria-label="Löschen"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
