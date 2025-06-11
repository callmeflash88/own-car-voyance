// src/widgets/home-filter-form/ui/FilterForm.tsx

"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select/Select";
import { FilterTab } from "@/features/car-filter/ui/FilterTab";

export const FilterForm = () => {
  const [tab, setTab] = useState<"shop" | "sell">("shop");
  const [formState, setFormState] = useState({
    condition: "",
    make: "",
    model: "",
    distance: "",
    location: "",
    cost: "",
  });

  const handleChange = (key: keyof typeof formState) => (value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle real search logic
    console.log(formState);
  };

  const options = [
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
  ];

  return (
    <div className="w-[1200px] bg-white rounded-3xl flex flex-col py-6 px-8 shadow-md">
      <FilterTab tab={tab} onSwitch={setTab} />
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-5 mt-6">
          <Select
            placeholder="New/Used"
            options={options}
            value={formState.condition}
            onChange={handleChange("condition")}
          />
          <Select
            placeholder="Make"
            options={options}
            value={formState.make}
            onChange={handleChange("make")}
          />
          <Select
            placeholder="Model"
            options={options}
            value={formState.model}
            onChange={handleChange("model")}
          />
          <Select
            placeholder="Distance"
            options={options}
            value={formState.distance}
            onChange={handleChange("distance")}
          />
          <Input
            placeholder="Location"
            value={formState.location}
            onChange={(e) => handleChange("location")(e.target.value)}
          />
          <Select
            placeholder="Cost"
            options={options}
            value={formState.cost}
            onChange={handleChange("cost")}
          />
        </div>
        <div className="mt-6">
          <Button type="submit" variant="primary" size="md">
            Browse Cars
          </Button>
        </div>
      </form>
    </div>
  );
};
