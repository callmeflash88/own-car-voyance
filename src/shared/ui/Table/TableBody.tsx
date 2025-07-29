import React, { FC } from "react";
import cn from "classnames";

import { TableRow } from "./TableRow";
import { Column, Row } from "@/shared/types/table";
import { Loader } from "lucide-react";

interface Props {
  cellClassname?: string;
  calssName?: string;
  rowClassname?: string;
  items: Row[];
  columns: Column[];
  emptyLabel?: string;
  isLoading?: boolean;
  refForInfinityScroll?: React.RefObject<HTMLDivElement>;
}

export const TableBody: FC<Props> = ({
  cellClassname,
  calssName,
  rowClassname,
  items,
  columns,
  emptyLabel = "No data available",
  isLoading,
  refForInfinityScroll,
}) => (
  <tbody className={cn(calssName)}>
    {isLoading ? (
      <tr>
        <td colSpan={columns.length}>
          {/* <Loader className="pt-8" size={Sizes.XXL} /> */}
        </td>
      </tr>
    ) : items?.length > 0 ? (
      items.map((item) => (
        <TableRow
          cellClassname={cellClassname}
          className={rowClassname ? rowClassname : ""}
          key={item.id}
          rowData={item}
          columns={columns}
        />
      ))
    ) : (
      <tr>
        <td
          colSpan={columns.length}
          className="pt-8 text-center text-lg font-semibold text-gray-800"
        >
          {emptyLabel}
        </td>
      </tr>
    )}
    <tr>
      <td colSpan={columns.length}>
        <div ref={refForInfinityScroll} style={{ height: "1px" }} />
      </td>
    </tr>
  </tbody>
);
