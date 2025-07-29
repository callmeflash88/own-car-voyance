import { ReactNode } from "react";
import cn from "classnames";

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
}) => (
  <td
    className={cn(
      "!border-b-1 border-white-lightgray py-6 text-center text-base font-medium text-black-base",
      className
    )}
  >
    {children}
  </td>
);
