import { Column } from "@/shared/types/table";
import cn from "classnames"; // Импортируем утилиту для удобной работы с классами

interface Props {
  className?: string;
  columns: Column[];
  isGray?: boolean;
}

export const TableHeader: React.FC<Props> = ({
  className,
  columns,
  isGray = false,
}) => (
  <thead className={`${className}`}>
    <tr>
      {columns.map((column, index) => (
        <th
          key={column.key}
          style={{
            ...(column.width ? { width: column.width } : {}),
            ...(isGray ? { backgroundColor: "#D9D9D9" } : {}),
          }}
          className={cn(
            "border-white-lightgray py-4 px-4 pb-4 text-[16px] font-[600] text-gray-regular ",
            {
              "rounded-tl-md": index === 0, // Закругление верхнего левого угла для первого th
              "rounded-tr-md": index === columns.length - 1, // Закругление верхнего правого угла для последнего th
            }
          )}
        >
          {column.label}
        </th>
      ))}
    </tr>
  </thead>
);
