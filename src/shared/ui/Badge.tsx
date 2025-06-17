// shared/ui/badge/index.tsx
type BadgeProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export const Badge = ({ label, active = false, onClick }: BadgeProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors
        ${
          active
            ? "bg-violet-600 text-white border-transparent"
            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
        }`}
    >
      {label}
    </button>
  );
};
