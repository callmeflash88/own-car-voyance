// shared/ui/badge/index.tsx
import cn from "classnames";

type BadgeProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export const Badge = ({ label, active = false, onClick }: BadgeProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full border text-sm font-medium transition-colors cursor-pointer",
        {
          "bg-violet-600 text-white border-transparent": active,
          "bg-white text-[#2B2B2B80] border-gray-200 hover:border-gray-400 hover:text-gray-600":
            !active,
        }
      )}
    >
      {label}
    </button>
  );
};
