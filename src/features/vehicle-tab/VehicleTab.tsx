import React from "react";
import clsx from "clsx";
import { CarStatus } from "@/shared/api/carApi";

type Props = {
  activeTab: CarStatus.ACTIVE | CarStatus.DRAFT;
  onChange: (tab: CarStatus.ACTIVE | CarStatus.DRAFT) => void;
};

export const VehicleTab = ({ activeTab, onChange }: Props) => {
  return (
    <div className="w-full flex border-b border-gray-200">
      {[CarStatus.ACTIVE, CarStatus.DRAFT].map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab as CarStatus.ACTIVE | CarStatus.DRAFT)}
          className={clsx(
            "px-4 py-2 text-sm font-medium capitalize flex-1 text-center",
            activeTab === tab
              ? "border-b-2 border-black text-black"
              : "text-gray-400"
          )}
        >
          {tab === CarStatus.ACTIVE ? "Active" : "Draft"}
        </button>
      ))}
    </div>
  );
};
