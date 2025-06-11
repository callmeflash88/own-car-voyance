// src/widgets/home-filter-tab/ui/FilterTab.tsx

import { Button } from "@/shared/ui/Button/Button";

type FilterTabProps = {
  tab: "shop" | "sell";
  onSwitch: (newTab: "shop" | "sell") => void;
};

const TABS = [
  { value: "shop", label: "Shop cars" },
  { value: "sell", label: "Sell your car" },
] as const;

export const FilterTab = ({ tab, onSwitch }: FilterTabProps) => {
  return (
    <div className="flex gap-2">
      {TABS.map(({ value, label }) => (
        <Button
          key={value}
          variant={tab === value ? "secondary" : "outline"}
          size="md"
          onClick={() => onSwitch(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
