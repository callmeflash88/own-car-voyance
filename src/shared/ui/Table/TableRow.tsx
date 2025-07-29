import React, { FC } from "react";
import cn from "classnames";

import { getKeyValue } from "./constants";
import { TableCell } from "./TableCell";
import { Column, Row } from "@/shared/types/table";

interface Props {
  cellClassname?: string;
  className: string;
  rowData: Row;
  columns: Column[];
}

export const TableRow: FC<Props> = ({
  className,
  rowData,
  columns,
  cellClassname,
}) => (
  <tr className={cn("text-left", className, "border-b")}>
    {columns.map((column) => (
      <TableCell key={column.key} className={cn(cellClassname)}>
        {getKeyValue(rowData, column.key)}
      </TableCell>
    ))}
  </tr>
);
