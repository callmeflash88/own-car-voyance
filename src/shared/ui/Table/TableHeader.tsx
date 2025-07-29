import { Column } from "@/shared/types/table";

interface Props {
  className?: string;
  columns: Column[];
}

export const TableHeader: React.FC<Props> = ({ className, columns }) => (
  <thead className={`${className} border-b`}>
    <tr>
      {columns.map((column) => (
        <th
          key={column.key}
          style={column.width ? { width: column.width } : {}}
          className="border-b-1 border-white-lightgray px-4 pb-4 text-[16px] font-[600] text-gray-regular"
        >
          {column.label}
        </th>
      ))}
    </tr>
  </thead>
);
